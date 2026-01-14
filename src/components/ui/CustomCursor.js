"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useSpring(0, { stiffness: 250, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 250, damping: 20 });

    const ringX = useSpring(0, { stiffness: 150, damping: 15 });
    const ringY = useSpring(0, { stiffness: 150, damping: 15 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            ringX.set(e.clientX);
            ringY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const isClickable = e.target.closest('button, a, input, textarea, [role="button"]');
            setIsHovered(!!isClickable);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
            {/* Inner Dot */}
            <motion.div
                style={{ x: mouseX, y: mouseY }}
                className="fixed -left-1 -top-1 w-2 h-2 bg-preque-earth rounded-full"
            />
            {/* Outer Ring */}
            <motion.div
                style={{ x: ringX, y: ringY }}
                animate={{
                    scale: isHovered ? 2.5 : 1,
                    opacity: isHovered ? 0.3 : 0.6,
                }}
                className="fixed -left-4 -top-4 w-8 h-8 border border-preque-earth rounded-full"
            />
        </div>
    );
};

export default CustomCursor;
