"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";

import { useToast } from "@/context/ToastContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            showToast("Welcome back!", "success");
            router.push(redirect);
        } catch (err) {
            const errorMessage = typeof err === 'string' ? err : err?.message || "Login failed";
            setError(errorMessage);
            showToast(errorMessage, "error");
        }
    };

    return (
        <main className="min-h-screen bg-preque-beige/30 flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-12 max-w-md w-full shadow-sm"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-serif text-preque-carbon mb-2">Welcome Back</h1>
                        <p className="text-xs tracking-[0.2em] uppercase text-gray-400">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                        <div>
                            <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-preque-earth transition-colors text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-preque-earth transition-colors text-sm"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-preque-carbon text-white text-xs tracking-[0.4em] uppercase font-bold hover:bg-black transition-all duration-300"
                        >
                            Sign In
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => window.location.href = 'http://localhost:5000/api/users/auth/google'}
                                className="flex items-center justify-center py-3 border border-gray-200 hover:bg-gray-50 transition-colors"
                                title="Sign in with Google"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.href = 'http://localhost:5000/api/users/auth/facebook'}
                                className="flex items-center justify-center py-3 border border-gray-200 hover:bg-gray-50 transition-colors"
                                title="Sign in with Facebook"
                            >
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5" alt="Facebook" />
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.href = 'http://localhost:5000/api/users/auth/instagram'}
                                className="flex items-center justify-center py-3 border border-gray-200 hover:bg-gray-50 transition-colors"
                                title="Sign in with Instagram"
                            >
                                <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" className="h-5 w-5" alt="Instagram" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            New to Preque? {" "}
                            <Link href="/register" className="text-preque-carbon font-bold hover:text-preque-earth transition-colors">Create Account</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

const LoginPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif uppercase tracking-[0.2em] text-gray-400">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
};

export default LoginPage;
