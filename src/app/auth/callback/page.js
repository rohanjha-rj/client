"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const CallbackContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setUser } = useAuth();
    const { showToast } = useToast();

    useEffect(() => {
        const handleCallback = () => {
            const userParam = searchParams.get('user');
            const error = searchParams.get('error');

            if (error) {
                showToast(error, "error");
                router.push('/login');
                return;
            }

            if (userParam) {
                try {
                    const userData = JSON.parse(decodeURIComponent(userParam));

                    // Store user data
                    localStorage.setItem("preque_user", JSON.stringify(userData));
                    setUser(userData);

                    showToast(`Welcome back, ${userData.name}!`, "success");
                    router.push('/');
                } catch (err) {
                    showToast("Authentication failed. Please try again.", "error");
                    router.push('/login');
                }
            } else {
                router.push('/login');
            }
        };

        handleCallback();
    }, [searchParams, router, setUser, showToast]);

    return (
        <main className="min-h-screen bg-preque-beige/30 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-preque-carbon mx-auto mb-4"></div>
                <p className="text-xs tracking-widest uppercase text-gray-600">Completing authentication...</p>
            </div>
        </main>
    );
};

const AuthCallbackPage = () => {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-preque-beige/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-preque-carbon mx-auto mb-4"></div>
                    <p className="text-xs tracking-widest uppercase text-gray-600">Loading...</p>
                </div>
            </main>
        }>
            <CallbackContent />
        </Suspense>
    );
};

export default AuthCallbackPage;
