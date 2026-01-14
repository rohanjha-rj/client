"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AdminHeader = () => {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);

    // Generate breadcrumbs from path
    const pathSegments = pathname.split('/').filter(p => p);

    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        // Format segment: replace hyphens with spaces and capitalize
        const label = segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        return { label, href, isLast };
    });

    return (
        <header className="sticky top-0 z-40 w-full h-16 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 px-8 flex items-center justify-between transition-colors duration-300">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Preque</span>
                {breadcrumbs.map((crumb, idx) => (
                    <div key={crumb.href} className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className={`font-medium tracking-wide ${crumb.isLast ? 'text-preque-carbon dark:text-white' : 'text-gray-400'}`}>
                            {crumb.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-6">
                {/* Global Search */}
                <div className="relative group">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-preque-earth transition-colors" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-preque-earth/30 focus:bg-white dark:focus:bg-black rounded-full text-xs w-64 transition-all outline-none text-preque-carbon dark:text-white placeholder:text-gray-400"
                    />
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 text-gray-500 hover:text-preque-earth dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black animate-pulse" />
                    </button>
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl shadow-2xl p-4 z-50 origin-top-right"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500">Notifications</h5>
                                    <span className="text-[10px] text-preque-earth font-medium cursor-pointer">Mark all read</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex gap-3 p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-preque-carbon dark:text-white">New Order #8932</p>
                                            <p className="text-xs text-gray-400">Received 2 mins ago</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-preque-carbon dark:text-white">Low Stock Warning</p>
                                            <p className="text-xs text-gray-400">Linen Shirt (Yellow) - 2 left</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-500 hover:text-preque-earth dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
