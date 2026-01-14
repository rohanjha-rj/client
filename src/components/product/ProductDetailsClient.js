"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import { Leaf, Droplets, ChevronRight, Check, AlertCircle } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ReviewList from "@/components/product/ReviewList";
import ReviewForm from "@/components/product/ReviewForm";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import Link from "next/link";
import { productAPI } from "@/lib/api";
import { products as localProducts } from "@/data/products";
import { useEffect } from "react";

export default function ProductDetailsClient({ product, relatedProducts, bundledItems }) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState("");
    const [activeImage, setActiveImage] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(product);
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            const filteredViewed = viewed.filter(vId => vId !== product._id);
            const newViewed = [product._id, ...filteredViewed].slice(0, 5);
            localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));

            // Load all recently viewed data
            const viewedProducts = localProducts.filter(p => newViewed.includes(p._id) && p._id !== product._id).slice(0, 4);
            setRecentlyViewed(viewedProducts);
        }
    }, [product._id]);

    const triggerFeedback = () => {
        if (typeof window !== 'undefined') {
            if (navigator.vibrate) navigator.vibrate(10);
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
            audio.volume = 0.2;
            audio.play().catch(() => { });
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        console.log('[ProductDetails] handleAddToCart called', {
            product: currentProduct.name,
            size: selectedSize,
            productId: currentProduct._id
        });
        triggerFeedback();
        setIsAdding(true);
        console.log('[ProductDetails] About to call addToCart from context');
        addToCart(currentProduct, selectedSize);
        console.log('[ProductDetails] addToCart called successfully');
        setTimeout(() => setIsAdding(false), 2000);
    };

    const selectedSizeInfo = currentProduct?.sizes.find(s => s.size === selectedSize);
    const isLowStock = selectedSizeInfo && selectedSizeInfo.inventory < 5 && selectedSizeInfo.inventory > 0;

    return (
        <main className="min-h-screen bg-preque-beige transition-colors duration-300">
            <Navbar />
            <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} category={currentProduct?.category || 'General'} />

            <div className="pt-24 md:pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-24">
                <Breadcrumbs />
                <div className="flex flex-col lg:flex-row gap-16 mb-24">
                    {/* Image Gallery */}
                    <div className="flex-1">
                        <div className="relative h-[600px] md:h-[800px] w-full overflow-hidden bg-preque-crema dark:bg-[#0A0A0A] mb-4">
                            <img
                                src={currentProduct.images[activeImage]?.url}
                                alt={currentProduct.name}
                                className="w-full h-full object-cover"
                            />
                            {currentProduct.isPreOrder && (
                                <div className="absolute top-6 left-6 bg-preque-earth text-white px-4 py-2 text-[10px] tracking-[0.3em] font-bold uppercase shadow-2xl">
                                    Pre-Order Exclusive
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4">
                            {currentProduct.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveImage(idx); triggerFeedback(); }}
                                    className={`w-20 h-28 overflow-hidden bg-gray-50 dark:bg-gray-900 border-2 transition-all ${activeImage === idx ? 'border-preque-earth' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img.url} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 lg:pl-16">
                        <div className="sticky top-32">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400 dark:text-gray-500 mb-4 block">{currentProduct.sku}</span>
                            <h1 className="text-4xl md:text-5xl font-serif text-preque-carbon mb-4">{currentProduct.name}</h1>
                            <p className="text-2xl font-light text-preque-carbon mb-10">₹{currentProduct.price}</p>

                            <p className="text-gray-600 dark:text-gray-400 mb-12 leading-relaxed font-sans text-sm max-w-lg">{currentProduct.description}</p>

                            <div className="mb-12">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-preque-carbon">Select Size</span>
                                    <button
                                        onClick={() => { setShowSizeGuide(true); triggerFeedback(); }}
                                        className="text-[10px] tracking-[0.4em] uppercase text-gray-400 border-b border-gray-400 hover:text-preque-carbon dark:hover:text-white transition-colors pb-1"
                                    >
                                        Size Guide
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    {currentProduct.sizes.map((s) => (
                                        <button
                                            key={s.size}
                                            disabled={s.inventory === 0}
                                            onClick={() => { setSelectedSize(s.size); triggerFeedback(); }}
                                            className={`w-12 h-12 flex items-center justify-center border text-[10px] tracking-widest transition-all duration-300 ${selectedSize === s.size
                                                ? 'bg-preque-carbon text-white dark:bg-white dark:text-black border-preque-carbon dark:border-white scale-110 shadow-lg'
                                                : s.inventory === 0
                                                    ? 'border-gray-100 text-gray-200 cursor-not-allowed dark:border-zinc-800 dark:text-zinc-700'
                                                    : 'border-gray-200 dark:border-zinc-700 hover:border-preque-carbon dark:hover:border-white text-preque-carbon dark:text-gray-300'
                                                }`}
                                        >
                                            {s.size}
                                        </button>
                                    ))}
                                </div>

                                {isLowStock && (
                                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-[10px] tracking-[0.2em] uppercase font-bold animate-pulse">
                                        <AlertCircle size={14} />
                                        <span>Mindful Alert: Only {selectedSizeInfo.inventory} left</span>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding || (selectedSize && selectedSizeInfo?.inventory === 0)}
                                className={`w-full py-5 bg-preque-carbon text-white dark:bg-white dark:text-black text-[10px] tracking-[0.5em] uppercase font-bold hover:bg-black dark:hover:bg-preque-crema transition-all duration-500 flex items-center justify-center gap-4 ${(!selectedSize || (selectedSize && selectedSizeInfo?.inventory === 0)) ? 'opacity-50' : ''}`}
                            >
                                {isAdding ? (
                                    <><Check size={18} /> Added to Closet</>
                                ) : (
                                    currentProduct.isPreOrder ? 'Pre-Order Now' : 'Add to Cart'
                                )}
                            </button>

                            {bundledItems.length > 0 && (
                                <div className="mt-20 p-8 glass rounded-sm">
                                    <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8 text-preque-carbon">Complete the Look</h4>
                                    <div className="space-y-6">
                                        {bundledItems.map((item) => (
                                            <div key={item._id} className="flex items-center gap-6 group">
                                                <div className="w-16 h-20 bg-gray-50 flex-shrink-0 overflow-hidden relative">
                                                    <img src={item.images[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <Link href={`/product/${item._id}`} className="text-xs font-serif hover:text-preque-earth transition-colors dark:text-gray-200">{item.name}</Link>
                                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">₹{item.price}</p>
                                                </div>
                                                <button onClick={triggerFeedback} className="text-[8px] tracking-[0.3em] font-bold uppercase border-b border-black dark:border-white pb-1 hover:text-preque-earth transition-colors">Add</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-16 pt-16 border-t border-gray-100 dark:border-zinc-800 space-y-8">
                                <div className="flex gap-4">
                                    <Leaf className="text-preque-earth" size={24} />
                                    <div>
                                        <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1 dark:text-gray-200">Sustainable Impact</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">{currentProduct.sustainabilityInfo?.details || "Eco-friendly production process."}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Droplets className="text-blue-400" size={24} />
                                    <div>
                                        <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1 dark:text-gray-200">Natural Dyes</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">Hand-dyed using plant pigments. Free from harsh chemicals.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-white/5 pt-20 mb-20">
                    <h2 className="text-3xl font-serif text-preque-carbon dark:text-preque-beige mb-12">Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div>
                            <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-preque-carbon dark:text-white">Customer Feedback</h3>
                            <ReviewList reviews={currentProduct.reviews || []} />
                        </div>
                        <div className="glass p-10">
                            <ReviewForm onSubmit={async (reviewData) => {
                                triggerFeedback();
                                try {
                                    await productAPI.createReview(currentProduct._id, reviewData);
                                    const { data } = await productAPI.getById(currentProduct._id);
                                    setCurrentProduct(data);
                                    alert("Review submitted successfully!");
                                } catch (error) {
                                    alert(error.response?.data?.message || "Failed to submit review");
                                }
                            }} />
                        </div>
                    </div>
                </div>

                {recentlyViewed.length > 0 && (
                    <div className="border-t border-gray-100 dark:border-white/5 pt-20 mt-20">
                        <h2 className="text-2xl font-serif text-preque-carbon dark:text-preque-beige mb-12 text-center uppercase tracking-[0.2em]">Recently Encountered</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {recentlyViewed.map(p => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
