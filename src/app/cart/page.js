"use client";

import Navbar from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { X, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";

const CartPage = () => {
    const { cartItems, removeFromCart, updateQty, itemsPrice, shippingPrice, totalPrice } = useCart();

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-preque-beige">
                <Navbar />
                <div className="pt-40 text-center px-6">
                    <h1 className="text-4xl font-serif text-preque-carbon mb-8">Your bag is empty.</h1>
                    <Link
                        href="/category/women"
                        className="inline-block px-10 py-4 bg-preque-carbon text-white text-xs tracking-[0.3em] uppercase font-bold"
                    >
                        Explore Collections
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <h1 className="text-4xl font-serif text-preque-carbon mb-12">Shopping Bag</h1>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Cart Items */}
                    <div className="flex-[2] space-y-8">
                        {cartItems.map((item) => (
                            <div key={`${item._id}-${item.size}`} className="flex gap-6 pb-8 border-b border-gray-100 items-center">
                                <div className="relative w-28 h-40 bg-gray-50 flex-shrink-0">
                                    <Image
                                        src={item.images[0].url}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-sm tracking-wider uppercase font-medium">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item._id, item.size)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">Size: {item.size}</p>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center border border-gray-200">
                                            <button
                                                onClick={() => updateQty(item._id, item.size, Math.max(1, item.qty - 1))}
                                                className="p-2 hover:bg-gray-50"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-10 text-center text-xs">{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item._id, item.size, item.qty + 1)}
                                                className="p-2 hover:bg-gray-50"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <p className="text-sm font-medium">₹{item.price * item.qty}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="flex-1">
                        <div className="bg-preque-beige/30 p-8 sticky top-32">
                            <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-8">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span>₹{itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span>{shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full py-5 bg-preque-carbon text-white text-xs tracking-[0.4em] uppercase font-bold hover:bg-black transition-all duration-300 flex items-center justify-center gap-4 mb-6"
                            >
                                Checkout <ArrowRight size={16} />
                            </Link>

                            <div className="text-[10px] text-gray-400 leading-relaxed space-y-2">
                                <p>• Secure checkout with Razorpay</p>
                                <p>• Free shipping on orders above ₹5000</p>
                                <p>• 15-day easy returns & exchanges</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
