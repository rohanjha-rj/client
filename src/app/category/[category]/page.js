"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/product/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

import { productAPI } from "@/lib/api";
import { products as localProducts } from "@/data/products";

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500));

                const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

                let filteredProducts = localProducts.filter(product =>
                    product.category.toLowerCase() === category.toLowerCase()
                );

                if (activeFilter !== "All") {
                    filteredProducts = filteredProducts.filter(product => product.subCategory === activeFilter);
                }

                // Sorting
                if (sortOrder === "price_low") {
                    filteredProducts.sort((a, b) => a.price - b.price);
                } else if (sortOrder === "price_high") {
                    filteredProducts.sort((a, b) => b.price - a.price);
                } else if (sortOrder === "newest") {
                    // Assuming local products don't have real dates, we keep order or prioritize newArrival
                    filteredProducts.sort((a, b) => (b.isNewArrival === a.isNewArrival) ? 0 : b.isNewArrival ? 1 : -1);
                }

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, activeFilter, sortOrder]);

    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif text-preque-carbon mb-4">{categoryTitle}</h1>
                    <p className="text-gray-500 font-sans tracking-widest uppercase text-xs">
                        Sustainable Essentials for the Modern Wardrobe
                    </p>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center border-y border-gray-100 py-6 mb-12 gap-6">
                    <div className="flex gap-6 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
                        {["All", "Shirts", "Dresses", "Trousers", "Outerwear"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`text-[10px] tracking-[0.2em] uppercase font-bold whitespace-nowrap transition-colors ${activeFilter === filter ? 'text-preque-earth underline' : 'text-gray-400 hover:text-preque-carbon'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-8 items-center w-full md:w-auto justify-between">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400">{products.length} Items</span>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="text-[10px] tracking-[0.2em] uppercase font-bold bg-transparent focus:outline-none cursor-pointer"
                        >
                            <option value="newest">Sort By: Newest</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="popular">Popularity</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="space-y-4">
                                <div className="h-[500px] bg-gray-100 w-full" />
                                <div className="h-4 bg-gray-100 w-3/4" />
                                <div className="h-4 bg-gray-100 w-1/4" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-gray-400 font-sans tracking-widest uppercase text-xs">No products found in this category.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer (Simplified) */}
            <footer className="border-t border-gray-100 py-12 text-center text-[10px] tracking-[0.3em] uppercase text-gray-400 bg-white">
                © 2026 Preque India • Conscious Fashion
            </footer>
        </main>
    );
};

export default CategoryPage;
