"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ExitIntentModal() {
    const [isVisible, setIsVisible] = useState(false);
    const { cartItems } = useCart();
    const [hasShown, setHasShown] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const handleMouseLeave = (e) => {
            if (e.clientY <= 0 && cartItems.length > 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, [cartItems, hasShown]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsVisible(false)} />
            <div className="relative bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-300 text-center">
                <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <div className="flex justify-center mb-6">
                    <div className="bg-preque-crema/20 p-4 rounded-full">
                        <Gift size={48} className="text-preque-earth" />
                    </div>
                </div>

                <h3 className="text-2xl font-serif font-bold text-preque-carbon dark:text-preque-beige mb-2">Wait! Don't Miss Out</h3>
                <p className="text-gray-500 mb-6">You have items in your cart. Complete your purchase now and get <span className="font-bold text-preque-earth">10% OFF</span> your first order.</p>

                <div className="bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-4 rounded-lg mb-6">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Use Code</p>
                    <p className="text-xl font-mono font-bold text-preque-carbon dark:text-preque-beige tracking-widest">WELCOME10</p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => { setIsVisible(false); router.push('/cart'); }}
                        className="w-full py-4 bg-preque-carbon text-white uppercase tracking-widest text-xs font-bold hover:bg-black transition-colors rounded"
                    >
                        Return to Cart
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        No thanks, I hate savings
                    </button>
                </div>
            </div>
        </div>
    );
}
