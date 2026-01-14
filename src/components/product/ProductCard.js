"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

const ProductCard = ({ product }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isSaved = isInWishlist(product._id);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setRotate({ x: -middleY / 20, y: middleX / 20 });
    };

    const resetRotate = () => setRotate({ x: 0, y: 0 });

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSaved) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetRotate}
            animate={{ rotateX: rotate.x, rotateY: rotate.y }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ perspective: 1000 }}
            className="group relative"
        >
            <Link href={`/product/${product._id}`}>
                <div className="relative h-[500px] overflow-hidden bg-preque-crema dark:bg-[#0A0A0A]">
                    <Image
                        src={product.images[0]?.url || "/images/placeholder.png"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.isNewArrival && (
                        <span className="absolute top-4 left-4 bg-white/95 dark:bg-black/80 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase font-bold z-10 text-preque-carbon dark:text-preque-beige border border-black/5 dark:border-white/10">
                            New Arrival
                        </span>
                    )}
                    <button
                        onClick={toggleWishlist}
                        className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-all ${isSaved ? 'bg-red-500 text-white shadow-lg' : 'bg-white/90 dark:bg-black/80 backdrop-blur-sm text-black dark:text-white hover:scale-110'}`}
                    >
                        <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
                    </button>
                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="mt-4 flex justify-between items-start">
                    <div>
                        <h3 className="text-sm font-sans tracking-wider text-preque-carbon dark:text-white uppercase font-medium">{product.name}</h3>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest">{product.fabric} • {product.dyeMethod}</p>
                    </div>
                    <p className="text-sm font-bold text-preque-carbon dark:text-white">₹{product.price}</p>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
