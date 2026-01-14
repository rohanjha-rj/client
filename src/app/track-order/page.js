"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import { Search, Package, Truck, CheckCircle } from "lucide-react";

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = (e) => {
        e.preventDefault();
        if (!orderId) return;

        setLoading(true);
        setStatus(null);

        // Simulate API call
        setTimeout(() => {
            const mockStatus = Math.random() > 0.5 ? "shipped" : "processing";
            setStatus({
                id: orderId,
                status: mockStatus,
                date: new Date().toLocaleDateString(),
                carrier: "BlueDart",
                trackingId: "BD" + Math.floor(Math.random() * 1000000)
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-black">
            <Navbar />
            <div className="pt-32 px-6 md:px-12 max-w-2xl mx-auto pb-24">
                <h1 className="text-4xl font-serif text-preque-carbon dark:text-white mb-6 text-center">Track Your Order</h1>
                <p className="text-gray-500 mb-12 text-center">Enter your Order ID to see the current status of your shipment.</p>

                <form onSubmit={handleTrack} className="mb-16">
                    <div className="relative">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order ID (e.g., #12345)"
                            className="w-full py-4 px-6 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg text-preque-carbon dark:text-preque-beige focus:outline-none focus:border-preque-earth transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={loading || !orderId}
                            className="absolute right-2 top-2 bottom-2 px-6 bg-preque-carbon text-white rounded hover:bg-black disabled:opacity-50 transition-colors flex items-center gap-2 uppercase tracking-widest text-xs font-bold"
                        >
                            {loading ? "Tracking..." : "Track"}
                        </button>
                    </div>
                </form>

                {status && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-start mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-preque-carbon dark:text-preque-beige">Order #{status.id}</h3>
                                <p className="text-sm text-gray-500">Placed on {status.date}</p>
                            </div>
                            <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${status.status === 'shipped' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {status.status}
                            </span>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-4 opacity-50">
                                <Package className="text-preque-carbon dark:text-preque-beige" />
                                <div>
                                    <h4 className="font-bold text-sm uppercase text-preque-carbon dark:text-preque-beige">Order Placed</h4>
                                    <p className="text-xs text-gray-500">We have received your order.</p>
                                </div>
                            </div>

                            <div className={`flex gap-4 ${status.status === 'processing' ? '' : 'opacity-50'}`}>
                                <Search className="text-preque-carbon dark:text-preque-beige" />
                                <div>
                                    <h4 className="font-bold text-sm uppercase text-preque-carbon dark:text-preque-beige">Processing</h4>
                                    <p className="text-xs text-gray-500">Your order is being prepared.</p>
                                </div>
                            </div>

                            <div className={`flex gap-4 ${status.status === 'shipped' ? '' : 'opacity-30'}`}>
                                <Truck className="text-preque-carbon dark:text-preque-beige" />
                                <div>
                                    <h4 className="font-bold text-sm uppercase text-preque-carbon dark:text-preque-beige">Shipped</h4>
                                    <p className="text-xs text-gray-500">
                                        {status.status === 'shipped'
                                            ? `On the way via ${status.carrier}. Tracking ID: ${status.trackingId}`
                                            : "Pending shipment"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 opacity-30">
                                <CheckCircle className="text-preque-carbon dark:text-preque-beige" />
                                <div>
                                    <h4 className="font-bold text-sm uppercase text-preque-carbon dark:text-preque-beige">Delivered</h4>
                                    <p className="text-xs text-gray-500">Estimated delivery in 3-5 days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
