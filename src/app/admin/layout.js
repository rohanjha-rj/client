"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Package, ShoppingCart, Users, Settings, LogOut, LayoutDashboard } from "lucide-react";

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
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-preque-carbon text-white flex flex-col">
                <div className="p-8 border-b border-gray-800">
                    <Link href="/" className="text-2xl font-serif tracking-[0.2em]">PREQUE</Link>
                    <span className="block text-[10px] tracking-widest text-preque-earth mt-2 uppercase font-bold">Admin Panel</span>
                </div>

                <nav className="flex-1 p-6 space-y-4">
                    <Link href="/admin" className="flex items-center gap-4 text-sm font-light hover:text-preque-earth transition-colors">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-4 text-sm font-light hover:text-preque-earth transition-colors">
                        <Package size={18} /> Products
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-4 text-sm font-light hover:text-preque-earth transition-colors">
                        <ShoppingCart size={18} /> Orders
                    </Link>
                    <Link href="/admin/customers" className="flex items-center gap-4 text-sm font-light hover:text-preque-earth transition-colors">
                        <Users size={18} /> Customers
                    </Link>
                </nav>

                <div className="p-6 border-t border-gray-800">
                    <button
                        onClick={() => { logout(); router.push("/login"); }}
                        className="flex items-center gap-4 text-sm font-light hover:text-red-400 transition-colors"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-12">
                {children}
            </main>

            {/* DEBUG OVERLAY */}
            <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded z-[9999] text-xs max-w-sm overflow-auto">
                <pre>{JSON.stringify({ user, loading }, null, 2)}</pre>
            </div>
        </div>
    );
}
