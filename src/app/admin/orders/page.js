"use client";

import { useState, useEffect } from "react";
import { orderAPI } from "@/lib/api";
import { Loader2, Eye, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

import DataTable from "@/components/admin/DataTable";

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

    const columns = [
        {
            header: "Order ID",
            accessor: "_id",
            render: (order) => <span className="font-mono text-xs">#{order._id.slice(-6).toUpperCase()}</span>
        },
        {
            header: "Customer",
            accessor: "shippingAddress",
            render: (order) => (
                <div>
                    <p className="text-sm font-medium text-preque-carbon dark:text-gray-200">{order.shippingAddress?.name || "Guest"}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{order.shippingAddress?.city || "N/A"}</p>
                </div>
            )
        },
        {
            header: "Total",
            accessor: "totalPrice",
            render: (order) => <span className="font-bold text-preque-carbon dark:text-gray-200">₹{order.totalPrice.toLocaleString()}</span>
        },
        {
            header: "Payment",
            accessor: "isPaid",
            render: (order) => order.isPaid ? (
                <span className="flex items-center gap-1.5 text-green-600 font-bold text-[10px] uppercase">
                    <CheckCircle2 size={12} /> Paid
                </span>
            ) : (
                <span className="flex items-center gap-1.5 text-red-500 font-bold text-[10px] uppercase">
                    <Clock size={12} /> Pending
                </span>
            )
        },
        {
            header: "Status",
            accessor: "isDelivered",
            render: (order) => order.isDelivered ? (
                <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[9px] font-bold uppercase tracking-widest border border-green-200 dark:border-green-900">Delivered</span>
            ) : (
                <span className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-[9px] font-bold uppercase tracking-widest border border-yellow-200 dark:border-yellow-900">Processing</span>
            )
        },
        {
            header: "Actions",
            accessor: "actions",
            render: (order) => (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => handleDeliver(order._id)}
                        disabled={!order.isPaid || order.isDelivered}
                        className="px-3 py-1.5 bg-preque-carbon text-white dark:bg-white dark:text-black text-[9px] font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        {order.isDelivered ? "Complete" : "Deliver"}
                    </button>
                    <Link href={`/orders/${order._id}`} className="p-1.5 border border-black/10 dark:border-white/10 rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-preque-carbon dark:hover:text-white transition-colors">
                        <Eye size={14} />
                    </Link>
                </div>
            )
        }
    ];

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-preque-earth" size={32} />
        </div>
    );

    return (
        <div className="h-full">
            <DataTable
                title="Manage Orders"
                data={orders}
                columns={columns}
                searchPlaceholder="Search orders..."
            />
        </div>
    );
};

export default AdminOrders;
