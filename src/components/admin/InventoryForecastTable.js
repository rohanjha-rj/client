"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";

const InventoryForecastTable = ({ data = [] }) => {
    // Sort by Days Remaining (Ascending) - Critical items first
    const sortedData = [...data].sort((a, b) => a.daysRemaining - b.daysRemaining);

    return (
        <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-black/5 dark:border-white/5">
                <h3 className="text-lg font-serif font-bold text-preque-carbon dark:text-white">Inventory Intelligence</h3>
                <p className="text-xs text-gray-400 mt-1">AI-driven stockout predictions based on 30-day sales velocity</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 dark:bg-black/20">
                        <tr>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Product</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Stock</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Velocity (Daily)</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Days Left</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                        {sortedData.length > 0 ? (
                            sortedData.map((item, idx) => (
                                <motion.tr
                                    key={item._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                >
                                    <td className="p-4">
                                        <p className="text-sm font-medium text-preque-carbon dark:text-gray-200">{item.name}</p>
                                        <p className="text-[10px] text-gray-400 font-mono">{item.sku}</p>
                                    </td>
                                    <td className="p-4 text-right text-sm font-bold">{item.currentStock}</td>
                                    <td className="p-4 text-right text-sm text-gray-500">{item.velocity}</td>
                                    <td className="p-4 text-right">
                                        <span className={`font-mono text-sm font-bold ${item.daysRemaining < 10 ? 'text-red-500' :
                                                item.daysRemaining < 30 ? 'text-orange-500' : 'text-green-500'
                                            }`}>
                                            {item.daysRemaining > 900 ? '999+' : item.daysRemaining}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-center">
                                        {item.status === 'Critical' && (
                                            <span className="flex items-center gap-1.5 px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[9px] font-bold uppercase tracking-widest border border-red-200 dark:border-red-900 rounded-full">
                                                <AlertCircle size={10} /> Critical
                                            </span>
                                        )}
                                        {item.status === 'Warning' && (
                                            <span className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[9px] font-bold uppercase tracking-widest border border-orange-200 dark:border-orange-900 rounded-full">
                                                <AlertTriangle size={10} /> Warning
                                            </span>
                                        )}
                                        {item.status === 'Healthy' && (
                                            <span className="flex items-center gap-1.5 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[9px] font-bold uppercase tracking-widest border border-green-200 dark:border-green-900 rounded-full">
                                                <CheckCircle2 size={10} /> Good
                                            </span>
                                        )}
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                                    No sales data sufficient for forecasting yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryForecastTable;
