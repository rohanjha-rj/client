"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function AdminLayout({ children }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || !user.isAdmin)) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading || !user || !user.isAdmin) {
        return <div className="h-screen flex items-center justify-center font-serif">Verifying Authorisation...</div>;
    }

    return (
        <div className="flex h-screen bg-gray-50/50 dark:bg-black text-preque-carbon dark:text-white overflow-hidden selection:bg-preque-earth selection:text-white">
            <AdminSidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <AdminHeader />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* Floating Quick Action Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-10 right-10 w-14 h-14 bg-preque-carbon dark:bg-white text-white dark:text-black rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-xl hover:shadow-preque-carbon/20 dark:hover:shadow-white/20 transition-shadow"
                    title="Quick Add"
                >
                    <Plus size={24} />
                </motion.button>
            </div>
        </div>
    );
}
