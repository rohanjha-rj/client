"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/context/ToastContext";

const Footer = () => {
    const [email, setEmail] = useState("");
    const { showToast } = useToast();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            showToast("Thank you for joining our community!", "success");
            setEmail("");
        }
    };

    return (
        <footer className="bg-black text-white py-24 px-4 overflow-hidden dark:bg-[#050505] border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start border-b border-white/10 pb-20">
                    <div>
                        <h2 className="text-4xl font-serif mb-8 leading-tight">Join the conscious <br /> community.</h2>
                        <p className="text-gray-400 dark:text-gray-300 text-sm tracking-widest uppercase mb-12">Exclusive access to new collections and sustainable stories.</p>

                        <form onSubmit={handleSubscribe} className="flex max-w-md w-full border-b border-white/30 pb-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent border-none focus:outline-none w-full text-white text-sm uppercase tracking-widest placeholder:text-gray-600 dark:placeholder:text-gray-400"
                                required
                            />
                            <button type="submit" className="text-[10px] tracking-[0.4em] uppercase font-bold text-preque-earth hover:text-white transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-500 mb-8">Collections</h4>
                            <ul className="space-y-4 text-xs tracking-widest uppercase text-gray-300 dark:text-gray-200">
                                <li><Link href="/category/men" className="hover:text-preque-earth transition-colors">Men</Link></li>
                                <li><Link href="/category/women" className="hover:text-preque-earth transition-colors">Women</Link></li>
                                <li><Link href="/category/new" className="hover:text-preque-earth transition-colors">New Arrivals</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-500 mb-8">About</h4>
                            <ul className="space-y-4 text-xs tracking-widest uppercase text-gray-300 dark:text-gray-200">
                                <li><Link href="/story" className="hover:text-preque-earth transition-colors">Our Story</Link></li>
                                <li><Link href="/sustainability" className="hover:text-preque-earth transition-colors">Sustainability</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-500 mb-8">Support</h4>
                            <ul className="space-y-4 text-xs tracking-widest uppercase text-gray-300 dark:text-gray-200">
                                <li><Link href="/contact" className="hover:text-preque-earth transition-colors">Contact</Link></li>
                                <li><Link href="/shipping" className="hover:text-preque-earth transition-colors">Shipping</Link></li>
                                <li><Link href="/returns" className="hover:text-preque-earth transition-colors">Returns</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-2xl font-serif font-bold tracking-widest opacity-50">PREQUE</div>
                    <p className="text-[10px] tracking-widest uppercase text-gray-600 dark:text-gray-400 text-center">
                        © {new Date().getFullYear()} PREQUE Sustainable Fashion. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
