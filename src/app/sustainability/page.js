"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Leaf, Droplets, Sun, Wind } from "lucide-react";

export default function SustainabilityPage() {
    const metrics = [
        { icon: Leaf, title: "100% Organic", desc: "No pesticides, no synthetic fibers. Just pure flax." },
        { icon: Droplets, title: "Zero Water Waste", desc: "Our dyeing process recycles 95% of its water intake." },
        { icon: Sun, title: "Natural Color", desc: "Dyed with roots, leaves, and minerals. Skin-friendly." },
        { icon: Wind, title: "Carbon Neutral", desc: "Locally sourced fibers to minimize our footprint." },
    ];

    return (
        <main className="min-h-screen bg-preque-beige">
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif text-preque-carbon mb-8"
                    >
                        Kind to Earth.
                    </motion.h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {metrics.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white shadow-sm border border-gray-100"
                            >
                                <item.icon className="text-preque-earth mb-4 mx-auto" size={32} />
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">{item.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-preque-carbon text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-serif mb-8">One Purchase. One Tree.</h2>
                    <p className="text-gray-400 mb-12 leading-relaxed">
                        Working with reforestation partners, we ensure that every order placed at Preque
                        results in one new tree planted in regions affected by deforestation.
                        We don't just take from nature—we give back.
                    </p>
                    <div className="inline-block border border-white/20 p-8">
                        <span className="block text-5xl font-serif text-preque-earth mb-2">1,240+</span>
                        <span className="text-[10px] tracking-widest uppercase text-gray-500">Trees Planted Since Launch</span>
                    </div>
                </div>
            </section>
        </main>
    );
}
