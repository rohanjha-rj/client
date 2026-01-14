"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("preque_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post("/users/login", { email, password });
            setUser(data);
            localStorage.setItem("preque_user", JSON.stringify(data));
            return data;
        } catch (error) {
            throw error.response?.data?.message || "Login failed";
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post("/users", { name, email, password });
            setUser(data);
            localStorage.setItem("preque_user", JSON.stringify(data));
            return data;
        } catch (error) {
            throw error.response?.data?.message || "Registration failed";
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("preque_user");
    };

    const refreshUser = async () => {
        try {
            const { data } = await api.get("/users/profile");
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem("preque_user", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Failed to refresh user", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
