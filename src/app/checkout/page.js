"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { orderAPI, couponAPI, userAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Check } from "lucide-react";

const CheckoutPage = () => {
    const router = useRouter();
    const { user, loading, refreshUser } = useAuth();
    const { cartItems, itemsPrice, shippingPrice, totalPrice, clearCart } = useCart();
    const { showToast } = useToast();

    // Saved Addresses State
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [saveAddress, setSaveAddress] = useState(false);

    // Coupon State
    // ... rest of state ...
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        city: "",
        postalCode: "",
        country: "India"
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: prev.name || user.name || "",
                email: prev.email || user.email || "",
                phone: prev.phone || user.phone || ""
            }));

            // Auto-select default address if exists
            const defaultAddr = user.addresses?.find(a => a.isDefault);
            if (defaultAddr) {
                handleAddressSelect(defaultAddr);
            }
        }
    }, [user]);

    const handleAddressSelect = (addr) => {
        setSelectedAddressId(addr._id);
        setFormData({
            name: addr.name || user?.name || "",
            email: user?.email || "",
            phone: addr.phone || "",
            address: addr.address || "",
            city: addr.city || "",
            postalCode: addr.postalCode || "",
            country: addr.country || "India"
        });
    };

    const handleChange = (e) => {
        setSelectedAddressId(""); // Reset selection if user types manually
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setIsApplyingCoupon(true);
        try {
            const { data } = await couponAPI.validate(couponCode);
            setDiscount(data.discount);
            showToast(`Coupon Applied: ${data.discount}% Off!`, "success");
        } catch (error) {
            setDiscount(0);
            showToast(error.response?.data?.message || "Invalid Coupon", "error");
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    const handlePayment = async () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.postalCode) {
            showToast("Please fill in all required fields", "error");
            return;
        }

        try {
            // Save address if requested and not already a saved one
            if (saveAddress && !selectedAddressId) {
                try {
                    await userAPI.addAddress({
                        ...formData,
                        isDefault: user.addresses?.length === 0
                    });
                    refreshUser();
                } catch (addrErr) {
                    console.error("Failed to save address", addrErr);
                }
            }

            // Calculate final total
            const finalTotal = discount > 0 ? Math.round(totalPrice * (1 - discount / 100)) : totalPrice;

            // 1. Create Order on Backend
            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.images[0].url,
                    price: item.price,
                    size: item.size,
                    product: item._id
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country,
                    phone: formData.phone,
                    name: formData.name
                },
                itemsPrice,
                shippingPrice,
                totalPrice: finalTotal
            };

            const { data } = await orderAPI.create(orderData);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                amount: data.razorpayOrder.amount,
                currency: "INR",
                name: "PREQUE",
                description: "Sustainable Luxury Fashion",
                order_id: data.razorpayOrder.id,
                handler: async function (response) {
                    try {
                        await orderAPI.verify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: data.order._id
                        });
                        clearCart();
                        router.push(`/order-confirmation?id=${data.order._id}`);
                    } catch (err) {
                        showToast("Payment verification failed. Please contact support.", "error");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: { color: "#1A1A1A" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment initiation failed", error);
            showToast("Failed to start payment. Are you logged in?", "error");
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <Link href="/cart" className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-8 hover:text-preque-carbon transition-colors">
                    <ArrowLeft size={14} /> Back to Bag
                </Link>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Checkout Form */}
                    <div className="flex-[2]">
                        <h1 className="text-3xl font-serif text-preque-carbon mb-8">Shipping Information</h1>

                        {/* Saved Addresses */}
                        {user?.addresses?.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4 text-gray-400">Select Saved Address</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user.addresses.map((addr) => (
                                        <button
                                            key={addr._id}
                                            onClick={() => handleAddressSelect(addr)}
                                            className={`text-left p-4 border transition-all ${selectedAddressId === addr._id ? 'border-preque-earth bg-preque-beige/10' : 'border-gray-100 hover:border-preque-earth/30'}`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-bold uppercase tracking-wider">{addr.name}</span>
                                                {addr.isDefault && <span className="text-[8px] bg-preque-earth text-white px-2 py-0.5 uppercase tracking-tighter">Default</span>}
                                            </div>
                                            <p className="text-[11px] text-gray-500 leading-relaxed truncate">{addr.address}</p>
                                            <p className="text-[11px] text-gray-400">{addr.city}, {addr.postalCode}</p>
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => {
                                            setSelectedAddressId("");
                                            setFormData({ ...formData, address: "", city: "", postalCode: "" });
                                        }}
                                        className="text-left p-4 border border-dashed border-gray-200 hover:border-preque-earth transition-all flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400 font-bold"
                                    >
                                        + Use New Address
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Full Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-preque-earth transition-colors text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-preque-earth transition-colors text-sm"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Contact Number</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-preque-earth transition-colors text-sm"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Shipping Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-preque-earth transition-colors text-sm resize-none"
                                    placeholder="Street name, Building No."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">City</label>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-preque-earth transition-colors text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Postal Code</label>
                                    <input
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-preque-earth transition-colors text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Country</label>
                                    <input
                                        name="country"
                                        value={formData.country}
                                        disabled
                                        className="w-full border-b border-gray-200 py-3 text-sm bg-transparent"
                                    />
                                </div>
                            </div>

                            {/* Save Address Checkbox */}
                            {!selectedAddressId && (
                                <div className="flex items-center gap-3 pt-4">
                                    <input
                                        type="checkbox"
                                        id="saveAddress"
                                        checked={saveAddress}
                                        onChange={(e) => setSaveAddress(e.target.checked)}
                                        className="w-4 h-4 border-gray-200 text-preque-earth focus:ring-preque-earth/30"
                                    />
                                    <label htmlFor="saveAddress" className="text-[10px] tracking-widest uppercase text-gray-500 font-medium cursor-pointer">
                                        Save this address for future use
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Review */}
                    <div className="flex-1">
                        <div className="bg-gray-50 p-8">
                            <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-8">Review Order</h2>

                            <div className="max-h-60 overflow-y-auto mb-8 space-y-4 pr-2">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">{item.name} x {item.qty} ({item.size})</span>
                                        <span className="font-medium">₹{item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 mb-8 pt-8 border-t border-gray-200">
                                {/* Coupon Input */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Promo Code"
                                        className="flex-1 border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-preque-earth uppercase"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        disabled={!couponCode || isApplyingCoupon}
                                        className="text-[10px] uppercase tracking-widest font-bold text-preque-carbon hover:text-preque-earth disabled:opacity-50"
                                    >
                                        {isApplyingCoupon ? '...' : 'Apply'}
                                    </button>
                                </div>
                                {discount > 0 && (
                                    <p className="text-xs text-green-600 flex items-center gap-1">
                                        <Check size={12} /> Coupon Applied: -{discount}%
                                    </p>
                                )}

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span>₹{itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span>{shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount</span>
                                        <span>-₹{Math.round(totalPrice * (discount / 100))}</span>
                                    </div>
                                )}
                                <div className="pt-4 border-t border-gray-200 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{discount > 0 ? Math.round(totalPrice * (1 - discount / 100)) : totalPrice}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                className="w-full py-5 bg-preque-carbon text-white text-xs tracking-[0.4em] uppercase font-bold hover:bg-black transition-all duration-300 flex items-center justify-center gap-4 mb-6"
                            >
                                Proceed to Payment <Lock size={16} />
                            </button>

                            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
                                <ShieldCheck size={14} /> 100% Secure Payment
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;
