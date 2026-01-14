"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const AdminSidebar = () => {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
        { name: "Products", href: "/admin/products", icon: <Package size={20} /> },
        { name: "Orders", href: "/admin/orders", icon: <ShoppingCart size={20} /> },
        { name: "Customers", href: "/admin/customers", icon: <Users size={20} /> },
    ];

    return (
        <motion.aside
            initial={{ width: 256 }}
            animate={{ width: collapsed ? 80 : 256 }}
            className="h-screen bg-white/80 dark:bg-black/80 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 flex flex-col z-50 transition-all duration-300 relative"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-8 bg-preque-earth text-white p-1 rounded-full shadow-lg hover:bg-preque-carbon transition-colors"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Logo Section */}
            <div className={`p-8 border-b border-gray-100 dark:border-white/5 flex items-center ${collapsed ? 'justify-center' : 'justify-start'}`}>
                {collapsed ? (
                    <span className="text-xl font-serif font-bold text-preque-carbon dark:text-white">P</span>
                ) : (
                    <div>
                        <Link href="/" className="text-2xl font-serif tracking-[0.2em] text-preque-carbon dark:text-white">PREQUE</Link>
                        <span className="block text-[10px] tracking-widest text-preque-earth mt-1 uppercase font-bold">Admin Workspace</span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex items-center gap-4 px-4 py-3 rounded-lg transition-colors group ${isActive ? 'text-preque-earth' : 'text-gray-500 dark:text-gray-400 hover:text-preque-carbon dark:hover:text-white'}`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-preque-earth/10 dark:bg-preque-earth/20 rounded-lg"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{item.icon}</span>
                            {!collapsed && (
                                <span className={`relative z-10 text-sm font-medium tracking-wide ${isActive ? 'font-bold' : ''}`}>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-preque-earth to-preque-carbon flex items-center justify-center text-white font-serif shadow-md">
                        {user?.name?.charAt(0) || "A"}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-preque-carbon dark:text-white truncate">{user?.name || "Admin"}</p>
                            <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
                        </div>
                    )}
                    {!collapsed && (
                        <button
                            onClick={logout}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </div>
        </motion.aside>
    );
};

export default AdminSidebar;
