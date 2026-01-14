"use client";

import { useAuth } from "@/context/AuthContext";
import { orderAPI } from "@/lib/api";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { User, Package, LogOut, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
    const { user, logout, loading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
        if (user) {
            fetchMyOrders();
        }
    }, [user, authLoading]);

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            const { data } = await orderAPI.getMyOrders();
            setOrders(data);
        } catch (err) {
            console.error("Error fetching my orders", err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) {
        return <div className="h-screen flex items-center justify-center font-serif">Loading Profile...</div>;
    }

    return (
        <main className="min-h-screen bg-preque-beige/30">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 space-y-8">
                        <div className="bg-white p-8 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-preque-beige rounded-full flex items-center justify-center mb-4">
                                    <User size={32} className="text-preque-earth" />
                                </div>
                                <h2 className="text-xl font-serif text-preque-carbon">{user.name}</h2>
                                <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">{user.email}</p>
                            </div>

                            <div className="mt-10 border-t border-gray-100 pt-8 space-y-6">
                                <Link href="/profile" className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-preque-carbon">
                                    <Package size={16} /> My Orders
                                </Link>
                                <button onClick={logout} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-red-400">
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-serif text-preque-carbon mb-12">Your Orders</h1>

                        {loading ? (
                            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-preque-earth" /></div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white p-12 text-center shadow-sm">
                                <p className="text-gray-400 font-sans tracking-[0.2em] uppercase text-xs mb-8">You haven't placed any orders yet.</p>
                                <Link href="/category/women" className="inline-block px-10 py-4 bg-preque-carbon text-white text-[10px] tracking-[0.3em] uppercase font-bold">Start Shopping</Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white p-8 shadow-sm flex flex-col md:flex-row justify-between items-center group hover:shadow-md transition-shadow">
                                        <div className="flex gap-8 items-center w-full md:w-auto">
                                            <div className="w-20 h-24 bg-gray-50 flex-shrink-0 relative">
                                                <img src={order.orderItems[0].image} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-1">Order #{order._id.slice(-6).toUpperCase()}</p>
                                                <p className="text-sm font-medium text-preque-carbon mb-2">{order.orderItems[0].name} {order.orderItems.length > 1 && `+ ${order.orderItems.length - 1} more`}</p>
                                                <div className="flex gap-4 items-center">
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${order.isPaid ? 'text-green-600' : 'text-red-400'}`}>
                                                        {order.isPaid ? 'Paid' : 'Payment Failed'}
                                                    </span>
                                                    <span className="text-gray-300">|</span>
                                                    <span className="text-[10px] uppercase tracking-widest text-gray-400">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 md:mt-0 flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                            <div className="text-right">
                                                <p className="text-lg font-medium">₹{order.totalPrice}</p>
                                                <p className={`text-[10px] font-bold uppercase tracking-widest ${order.isDelivered ? 'text-preque-earth' : 'text-yellow-600'}`}>
                                                    {order.isDelivered ? 'Delivered' : 'In Transit'}
                                                </p>
                                            </div>
                                            <Link href={`/order-confirmation?id=${order._id}`} className="p-3 bg-gray-50 rounded-full group-hover:bg-preque-beige transition-colors">
                                                <ChevronRight size={20} className="text-preque-carbon" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
