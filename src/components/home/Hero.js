"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) / 50;
        const moveY = (clientY - window.innerHeight / 2) / 50;
        setMousePos({ x: moveX, y: moveY });
    };

    const title = "PURE LINEN. NATURALLY DYED.";

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
        >
            {/* Background Image with Parallax */}
            <motion.div
                animate={{
                    x: mousePos.x,
                    y: mousePos.y,
                    scale: 1.1
                }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/hero.png"
                    alt="Preque Sustainable Fashion"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl">
                <motion.span
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.4em" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-white text-[10px] md:text-xs tracking-[0.4em] uppercase mb-8 block font-medium"
                >
                    Fashion Meets Sustainability
                </motion.span>

                <h1 className="text-5xl md:text-8xl font-serif text-white mb-10 tracking-wider flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {title.split(" ").map((word, wIdx) => (
                        <span key={wIdx} className="inline-block overflow-hidden pb-2">
                            {word.split("").map((char, cIdx) => (
                                <motion.span
                                    key={cIdx}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: (wIdx * 5 + cIdx) * 0.03,
                                        ease: [0.33, 1, 0.68, 1]
                                    }}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    ))}
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-8"
                >
                    <Magnetic>
                        <Link
                            href="/category/men"
                            className="group relative px-12 py-5 bg-white text-preque-carbon overflow-hidden transition-all duration-500 font-bold tracking-[0.3em] uppercase text-[10px] w-full md:w-auto hover:bg-preque-earth hover:text-white"
                        >
                            <span className="relative z-10">Shop Men</span>
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link
                            href="/category/women"
                            className="group relative px-12 py-5 border border-white text-white overflow-hidden transition-all duration-500 font-bold tracking-[0.3em] uppercase text-[10px] w-full md:w-auto hover:bg-white hover:text-black"
                        >
                            <span className="relative z-10">Shop Women</span>
                        </Link>
                    </Magnetic>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="w-[1px] h-16 bg-white/50" />
            </motion.div>
        </section>
    );
};

export default Hero;
