"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function StoryPage() {
    return (
        <main className="min-h-screen bg-preque-beige">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] tracking-[0.4em] uppercase text-preque-earth font-bold mb-4 block"
                    >
                        The Heritage
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-preque-carbon mb-8"
                    >
                        Our Story.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 leading-relaxed font-light"
                    >
                        Preque was born from a simple observation: the world moves too fast, and fashion has forgotten its roots.
                        We returned to the basics—pure linen, natural dyes, and human hands—to create a collection that honors both
                        the wearer and the world.
                    </motion.p>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif mb-6 text-preque-carbon">Slow Fashion, <br /> Forever Wear.</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Every garment we produce is built to last. We don't follow trends; we create timeless silhouettes
                            that develop character over time. Our linen softens with every wash, becoming a part of your journey.
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-[1px] bg-preque-earth mt-3" />
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Ethically Crafted</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-[1px] bg-preque-earth mt-3" />
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Zero Synthetic Dyes</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-[1px] bg-preque-earth mt-3" />
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Fair Wages & Transparency</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
