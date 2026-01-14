"use client";

import { useState, useEffect } from "react";
import { userAPI } from "@/lib/api";
import { Loader2, User, Mail, ShieldCheck, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const { data } = await userAPI.getAll();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <Loader2 className="animate-spin text-preque-earth" size={32} />
        </div>
    );

    return (
        <div className="p-8">
            <div className="mb-12">
                <h1 className="text-3xl font-serif text-preque-carbon mb-2">Customer Base</h1>
                <p className="text-xs tracking-[0.2em] uppercase text-gray-400">Manage and view your conscious community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer, index) => (
                    <motion.div
                        key={customer._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 bg-preque-beige rounded-full flex items-center justify-center text-preque-earth">
                                <User size={24} />
                            </div>
                            {customer.isAdmin && (
                                <span className="flex items-center gap-1 text-[8px] tracking-[0.2em] uppercase bg-preque-carbon text-white px-2 py-1 rounded">
                                    <ShieldCheck size={10} /> Admin
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-serif text-preque-carbon mb-1">{customer.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 mb-6">
                            <Mail size={12} />
                            <span className="text-xs">{customer.email}</span>
                        </div>

                        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[8px] tracking-[0.2em] uppercase text-gray-400 mb-1">Joined</span>
                                <div className="flex items-center gap-1 text-[10px] text-preque-carbon">
                                    <Calendar size={10} /> {new Date(customer.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdminCustomers;
