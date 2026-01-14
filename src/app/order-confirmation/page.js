"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { CheckCircle2, Heart, Trees } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const OrderConfirmationContent = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");

    return (
        <main className="min-h-screen bg-preque-beige/30">
            <Navbar />

            <div className="pt-40 pb-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <CheckCircle2 className="mx-auto text-preque-earth mb-8" size={80} />
                    <h1 className="text-5xl font-serif text-preque-carbon mb-4">Thank you for chosen conscious.</h1>
                    <p className="text-gray-500 tracking-[0.2em] uppercase text-xs mb-12">Order ID: #{orderId}</p>
                </motion.div>

                <div className="bg-white p-12 shadow-sm mb-12">
                    <div className="flex flex-col items-center mb-10">
                        <Trees className="text-preque-earth mb-4" size={40} />
                        <h2 className="text-2xl font-serif text-preque-carbon mb-4">A tree is being planted because of you.</h2>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                            Through our partnership with global reforestation projects, your order has contributed to the growth of a new tree. We'll send you the exact coordinates of your tree once it's planted.
                        </p>
                    </div>

                    <div className="w-full h-[1px] bg-gray-100 mb-10" />

                    <p className="text-sm text-gray-600 mb-8">
                        A confirmation email with your order details and shipping information has been sent to your email address.
                    </p>

                    <Link
                        href="/"
                        className="inline-block px-10 py-4 bg-preque-carbon text-white text-xs tracking-[0.3em] uppercase font-bold hover:bg-black transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>

                <div className="flex justify-center gap-2 items-center text-preque-earth text-sm font-medium">
                    <Heart size={16} fill="currentColor" /> Shared with love for the planet
                </div>
            </div>
        </main>
    );
};

const OrderConfirmationPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-preque-beige/30 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-preque-carbon" />
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
};

export default OrderConfirmationPage;
