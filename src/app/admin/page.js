"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, CreditCard, TrendingUp, AlertTriangle, Clock, RefreshCcw, Download, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { analyticsAPI, orderAPI } from "@/lib/api";
import InventoryForecastTable from "@/components/admin/InventoryForecastTable";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";

export default function AdminDashboard() {
    const { token } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const fetchData = async () => {
        if (!token) return;
        try {
            setDataLoading(true);
            const [statsRes, forecastRes, ordersRes] = await Promise.all([
                analyticsAPI.getDashboardStats(),
                analyticsAPI.getInventoryForecast(),
                orderAPI.getAll()
            ]);

            setAnalytics(statsRes.data);
            setForecast(forecastRes.data);
            // Sort orders by date desc and take top 5
            const sortedOrders = ordersRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecentOrders(sortedOrders.slice(0, 5));
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Live update every minute
        return () => clearInterval(interval);
    }, [token]);

    const statCards = [
        {
            title: "Total Revenue",
            value: `₹${(analytics?.totalRevenue || 0).toLocaleString()}`,
            icon: <CreditCard size={20} />,
            color: "bg-green-500 text-green-500",
            change: true
        },
        {
            title: "Paid Orders",
            value: analytics?.totalOrders || 0,
            icon: <ShoppingBag size={20} />,
            color: "bg-blue-500 text-blue-500",
            change: true
        },
        {
            title: "Active Bag Sessions",
            value: analytics?.activeCartsCount || 0,
            icon: <Clock size={20} />,
            color: "bg-orange-500 text-orange-500",
            change: false
        },
        {
            title: "Abandoned Rate",
            value: `${Math.round(((analytics?.abandonedCartsCount || 0) / ((analytics?.totalOrders || 0) + (analytics?.abandonedCartsCount || 0))) * 100 || 0)}%`,
            icon: <AlertTriangle size={20} />,
            color: "bg-red-500 text-red-500",
            change: false
        },
    ];

    if (dataLoading && !analytics) return (
        <div className="flex h-full items-center justify-center animate-pulse text-xs tracking-widest uppercase text-gray-400">
            Fetching Business Intelligence...
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-10">
            {/* Header Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-serif text-preque-carbon dark:text-white">Overview</h2>
                    <p className="text-xs text-gray-400 mt-1">Real-time performance metrics</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchData} className="p-2 border border-black/5 dark:border-white/5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group bg-white dark:bg-black">
                        <RefreshCcw size={16} className="text-gray-400 group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                    <button className="px-4 py-2 bg-preque-carbon text-white dark:bg-white dark:text-black text-[10px] tracking-widest uppercase font-bold flex items-center gap-3 hover:opacity-90 transition-opacity rounded-lg shadow-lg">
                        <Download size={14} /> Export Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500`}>
                            {stat.icon}
                        </div>

                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 text-${stat.color.split('-')[1]}-600 dark:text-${stat.color.split('-')[1]}-400`}>
                                {stat.icon}
                            </div>
                            {stat.change && (
                                <span className="flex items-center text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                    <TrendingUp size={12} className="mr-1" /> +12%
                                </span>
                            )}
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-preque-carbon dark:text-white mb-1 tracking-tight">{stat.value}</h3>
                            <p className="text-[11px] font-medium text-gray-400">{stat.title}</p>
                        </div>

                        {/* Progress Bar Mockup */}
                        <div className="w-full bg-gray-100 dark:bg-white/5 h-1 mt-4 rounded-full overflow-hidden">
                            <div className={`h-full ${stat.color.split(' ')[0]} opacity-80 w-[70%] rounded-full`} />
                        </div>
                    </div>
                ))}
            </div>


            {/* Inventory Forecasting (Item 15) */}
            < div className="grid grid-cols-1 lg:grid-cols-2 gap-8" >
                <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 p-8 rounded-sm shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Inventory Liquidity Forecast</h4>
                        <AlertTriangle className="text-orange-500 animate-pulse" size={20} />
                    </div>
                    <div className="space-y-6">
                        {inventory.slice(0, 5).map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center pb-6 border-b border-black/5 dark:border-zinc-800 last:border-0 hover:pl-2 transition-all duration-300">
                                <div className="max-w-[60%]">
                                    <p className="text-sm font-bold text-preque-carbon dark:text-gray-200 truncate">{item.name}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Vel: {item.velocity}/day • {item.currentStock} in stock</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[9px] font-bold uppercase px-3 py-1.5 rounded-sm ${item.status === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                        item.status === 'Warning' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                                            'bg-green-500/10 text-green-500 border border-green-500/20'
                                        }`}>
                                        {item.daysRemaining} {item.daysRemaining === 1 ? 'Day' : 'Days'} Left
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conversion Performance */}
                <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 p-8 rounded-sm shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-10">
                            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Funnel Performance</h4>
                            <Activity className="text-preque-earth" size={20} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                            <div>
                                <p className="text-3xl font-serif text-preque-carbon dark:text-white">
                                    {Math.round((analytics?.totalOrders / (analytics?.totalOrders + analytics?.abandonedCartsCount + analytics?.activeCartsCount)) * 100 || 0)}%
                                </p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-2">Funnel Conversion</p>
                            </div>
                            <div>
                                <p className="text-3xl font-serif text-preque-carbon dark:text-white">
                                    ₹{Math.round(analytics?.totalRevenue / (analytics?.totalOrders || 1)).toLocaleString()}
                                </p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-2">Avg. Basket Value</p>
                            </div>
                            <div>
                                <p className="text-3xl font-serif text-preque-carbon dark:text-white">
                                    {analytics?.abandonedCartsCount}
                                </p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-2">Recoverable Carts</p>
                            </div>
                            <div>
                                <p className="text-3xl font-serif text-preque-carbon dark:text-white">99%</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-2">Server Uptime</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-black/5 dark:border-zinc-800">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                            <span>Projected Monthly Revenue</span>
                            <span className="text-preque-earth">₹{(analytics?.totalRevenue * 4).toLocaleString()}</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-preque-earth w-3/4 rounded-full" />
                        </div>
                    </div>
                </div>
            </div >

            {/* Recent Orders Overview */}
            < div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-sm shadow-sm overflow-hidden translate-y-0 hover:shadow-xl transition-all duration-500" >
                <div className="p-8 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Transaction Manifest</h3>
                    <ShoppingBag size={16} className="text-gray-400" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-black/20">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Order Identity</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Timestamp</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Value (INR)</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Lifecycle State</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 dark:divide-white/5">
                            {recentOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="p-6">
                                        <p className="font-serif text-sm text-preque-carbon dark:text-white group-hover:text-preque-earth transition-colors">{order.user?.name || "Private Guest"}</p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">ID: {order._id.slice(-8)}</p>
                                    </td>
                                    <td className="p-6 text-[10px] text-gray-500 uppercase tracking-widest">
                                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        <br />
                                        <span className="text-[8px] opacity-70 italic">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                    </td>
                                    <td className="p-6 text-sm font-bold text-preque-carbon dark:text-preque-beige">₹{order.totalPrice.toLocaleString()}</td>
                                    <td className="p-6">
                                        <span className={`px-4 py-1.5 rounded-sm text-[8px] font-bold uppercase tracking-[0.2em] shadow-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                                            order.status === 'Processing' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800' :
                                                'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    recentOrders.length === 0 && (
                        <div className="p-20 text-center">
                            <Activity size={40} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-xs tracking-widest uppercase text-gray-400 font-bold">No transactions recorded yet</p>
                        </div>
                    )
                }
            </div >
        </div >
    );
}
