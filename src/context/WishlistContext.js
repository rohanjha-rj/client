"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [mounted, setMounted] = useState(false);
    const { showToast } = useToast();
    const { user } = useAuth();

    useEffect(() => {
        setMounted(true);
        if (user) {
            const savedWishlist = localStorage.getItem(`preque_wishlist_${user._id}`);
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        } else {
            setWishlist([]);
        }
    }, [user]);

    useEffect(() => {
        if (mounted && user) {
            localStorage.setItem(`preque_wishlist_${user._id}`, JSON.stringify(wishlist));
        }
    }, [wishlist, mounted, user]);

    const addToWishlist = (product) => {
        if (!user) {
            showToast("Please login to save items to your wishlist", "info");
            return;
        }
        if (wishlist.find(item => item._id === product._id)) {
            showToast("Item already in wishlist", "info");
            return;
        }
        setWishlist([...wishlist, product]);
        showToast("Added to wishlist", "success");
    };

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter(item => item._id !== productId));
        showToast("Removed from wishlist", "info");
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
