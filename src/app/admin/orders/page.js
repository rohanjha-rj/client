"use client";

import { useState, useEffect } from "react";
import { orderAPI } from "@/lib/api";
import { Loader2, Eye, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await orderAPI.getAll();
            setOrders(data);
        } catch (err) {
            console.error("Error fetching orders", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeliver = async (id) => {
        if (window.confirm("Mark this order as delivered?")) {
            try {
                await orderAPI.deliver(id);
                fetchOrders();
            } catch (err) {
                alert("Action failed");
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-serif text-preque-carbon mb-8">Manage Orders</h1>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-preque-earth" /></div>
            ) : (
                <div className="bg-white shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-[10px] tracking-widest uppercase text-gray-400">
                                <th className="px-8 py-4">Order ID</th>
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-8 py-4">Total</th>
                                <th className="px-8 py-4">Paid</th>
                                <th className="px-8 py-4">Delivered</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-6 text-sm font-medium">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-medium">{order.shippingAddress.name}</p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{order.shippingAddress.city}</p>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold">₹{order.totalPrice}</td>
                                    <td className="px-8 py-6">
                                        {order.isPaid ? (
                                            <span className="flex items-center gap-2 text-green-600 font-bold text-[10px] uppercase">
                                                <CheckCircle2 size={12} /> Paid
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 text-red-500 font-bold text-[10px] uppercase">
                                                <Clock size={12} /> Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        {order.isDelivered ? (
                                            <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest">Yes</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-[10px] font-bold uppercase tracking-widest">No</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => handleDeliver(order._id)}
                                            disabled={!order.isPaid || order.isDelivered}
                                            className="text-preque-carbon hover:underline text-[10px] tracking-[0.2em] uppercase font-bold disabled:opacity-30"
                                        >
                                            {order.isDelivered ? "Delivered" : "Mark Delivered"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
