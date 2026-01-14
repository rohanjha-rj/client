"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import { products } from "@/data/products"; // Import products for re-hydration

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [initialFetchComplete, setInitialFetchComplete] = useState(false);

    const { user } = useAuth();
    const { showToast } = useToast();
    const token = user?.token; // Extract token from user object

    // Fetch cart from backend on mount/login
    useEffect(() => {
        const fetchCart = async () => {
            console.log('[CartContext] fetchCart called', { user: !!user, token: !!token });
            if (user && token) {
                try {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log('[CartContext] Fetched cart from backend:', data);
                    if (data.cartItems && data.cartItems.length > 0) {
                        console.log('[CartContext] Setting cart items from backend:', data.cartItems.length, 'items');
                        // Re-hydrate: convert product slugs to full product objects
                        const hydratedItems = data.cartItems.map(item => {
                            const fullProduct = products.find(p => p._id === item.product);
                            if (!fullProduct) {
                                console.warn('[CartContext] Product not found for slug:', item.product);
                                return null;
                            }
                            return {
                                ...fullProduct, // Full product object with all fields
                                qty: item.qty,
                                size: item.size
                            };
                        }).filter(Boolean); // Remove any null entries
                        console.log('[CartContext] Hydrated cart items:', hydratedItems.length, 'items');
                        setCartItems(hydratedItems);
                    } else {
                        // If no backend cart, check local storage for guest session
                        const savedCart = localStorage.getItem(`preque_cart_${user._id}`);
                        console.log('[CartContext] No backend cart, checking localStorage:', !!savedCart);
                        if (savedCart) setCartItems(JSON.parse(savedCart));
                    }
                } catch (error) {
                    console.error("[CartContext] Failed to fetch cart", error);
                }
            }
            // Mark initial fetch as complete and set mounted AFTER fetch completes
            console.log('[CartContext] Setting mounted=true and initialFetchComplete=true');
            setInitialFetchComplete(true);
            setMounted(true);
        };
        fetchCart();
    }, [user, token]);

    // Sync cart to backend/localStorage
    useEffect(() => {
        console.log('[CartContext] Sync effect triggered', {
            mounted,
            user: !!user,
            initialFetchComplete,
            cartItemsCount: cartItems.length
        });
        // Only sync after initial fetch is complete to prevent race condition
        if (mounted && user && initialFetchComplete) {
            console.log('[CartContext] Syncing cart to localStorage and backend');
            localStorage.setItem(`preque_cart_${user._id}`, JSON.stringify(cartItems));
            localStorage.setItem(`preque_cart_${user._id}_last_modified`, new Date().toISOString());

            const syncWithBackend = async () => {
                if (token) {
                    try {
                        console.log('[CartContext] Syncing to backend:', cartItems.length, 'items');
                        // Transform cart items to match backend schema
                        const transformedCartItems = cartItems.map(item => ({
                            name: item.name,
                            qty: item.qty,
                            image: item.images?.[0]?.url || item.image || '',
                            price: item.price,
                            size: item.size,
                            product: item._id // Backend expects 'product' field with ObjectId
                        }));

                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart`, {
                            cartItems: transformedCartItems,
                            itemsPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
                            shippingPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) > 5000 ? 0 : 250,
                            totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) + (cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) > 5000 ? 0 : 250)
                        }, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        console.log('[CartContext] Backend sync successful');
                    } catch (error) {
                        console.error("[CartContext] Failed to sync cart", error);
                        console.error("[CartContext] Error details:", error.response?.data);
                    }
                }
            };

            const timeoutId = setTimeout(syncWithBackend, 2000); // Debounce sync
            return () => clearTimeout(timeoutId);
        }
    }, [cartItems, mounted, user, token, initialFetchComplete]);

    const addToCart = (product, size) => {
        if (!user) {
            showToast("Please login to add items to your bag", "info");
            return;
        }
        console.log('[CartContext] addToCart called', { product: product.name, size });
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item._id === product._id && item.size === size
            );

            if (existingItem) {
                console.log('[CartContext] Incrementing existing item');
                return prevItems.map((item) =>
                    item._id === product._id && item.size === size
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            console.log('[CartContext] Adding new item to cart');
            const newItems = [...prevItems, { ...product, size, qty: 1 }];
            console.log('[CartContext] New cart state:', newItems.length, 'items');
            return newItems;
        });
    };

    const removeFromCart = (id, size) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item._id === id && item.size === size))
        );
    };

    const updateQty = (id, size, qty) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id && item.size === size ? { ...item, qty } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 5000 ? 0 : 250;
    const totalPrice = itemsPrice + shippingPrice;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
                itemsPrice,
                shippingPrice,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
