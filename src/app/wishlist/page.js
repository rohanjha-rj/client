"use client";

import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/product/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    return (
        <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-black">
            <Navbar />
            <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-24">
                <h1 className="text-4xl font-serif text-preque-carbon dark:text-white mb-8">My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 mb-8">Your wishlist is empty.</p>
                        <Link href="/" className="px-8 py-3 bg-preque-carbon text-white uppercase tracking-widest text-xs hover:bg-black transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {wishlist.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
