"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { motion } from "framer-motion";

const DataTable = ({ columns, data, title, action, searchPlaceholder = "Search..." }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter data
    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            {/* Table Header */}
            <div className="p-6 border-b border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-serif font-bold text-preque-carbon dark:text-white">{title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{filteredData.length} entries found</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-preque-earth/30 focus:bg-white dark:focus:bg-black rounded-lg text-xs w-full md:w-64 transition-all outline-none"
                        />
                    </div>
                    <button className="p-2 border border-black/5 dark:border-white/5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <Filter size={16} className="text-gray-400" />
                    </button>
                    {action && <div>{action}</div>}
                </div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 dark:bg-black/20 sticky top-0 z-10 backdrop-blur-sm">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                        {currentData.length > 0 ? (
                            currentData.map((row, rowIdx) => (
                                <motion.tr
                                    key={row._id || rowIdx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: rowIdx * 0.05 }}
                                    className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                >
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className="p-4 text-sm text-preque-carbon dark:text-gray-300">
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="p-12 text-center text-gray-400 text-sm">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center bg-gray-50/30 dark:bg-black/20">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Page {currentPage} of {totalPages || 1}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-white dark:hover:bg-white/10 disabled:opacity-50 transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="p-2 rounded-lg hover:bg-white dark:hover:bg-white/10 disabled:opacity-50 transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
