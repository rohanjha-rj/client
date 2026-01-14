"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function SustainabilityBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-8 right-8 z-[100] group cursor-pointer hidden md:block"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border border-preque-earth/30 flex items-center justify-center bg-white/10 backdrop-blur-sm relative"
            >
                {/* Rotating Text Area */}
                <svg className="absolute inset-0 w-full h-full fill-preque-earth text-[8px] font-bold tracking-[0.2em] uppercase" viewBox="0 0 100 100">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text>
                        <textPath xlinkHref="#circlePath">
                            Sustainable • Ethical • Organic • Luxury •
                        </textPath>
                    </text>
                </svg>

                <Leaf size={24} className="text-preque-earth group-hover:scale-125 transition-transform duration-500" />
            </motion.div>
        </motion.div>
    );
}
