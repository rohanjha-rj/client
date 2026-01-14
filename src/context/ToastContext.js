"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const playSound = (soundType = 'click') => {
        if (typeof window === 'undefined') return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = 'sine';
            if (soundType === 'click') {
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
            } else if (soundType === 'success') {
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
            }

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.error("Audio feedback failed", e);
        }
    };

    const showToast = (message, type = "success") => {
        // Prevent duplicate toasts with the same message
        const isDuplicate = toasts.some(toast => toast.message === message && toast.type === type);
        if (isDuplicate) return;

        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        if (type === 'success') playSound('success');
        setTimeout(() => removeToast(id), 5000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast, playSound }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 max-w-sm w-full pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`pointer-events-auto p-4 shadow-2xl flex items-center justify-between border ${toast.type === "success"
                                ? "bg-white border-preque-earth text-preque-carbon"
                                : "bg-red-50 border-red-200 text-red-800"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {toast.type === "success" ? (
                                    <CheckCircle size={20} className="text-preque-earth" />
                                ) : (
                                    <XCircle size={20} className="text-red-500" />
                                )}
                                <span className="text-[10px] tracking-widest uppercase font-bold">{toast.message}</span>
                            </div>
                            <button onClick={() => removeToast(toast.id)} className="ml-4 opacity-40 hover:opacity-100">
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
