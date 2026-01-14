"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Search, Edit2, Trash2, Filter, Loader2, X } from "lucide-react";
import { productAPI } from "@/lib/api";
import Image from "next/image";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: "Men",
        subCategory: "",
        description: "",
        fabric: "100% Pure Linen",
        dyeMethod: "",
        fit: "",
        price: "",
        images: [],
        sustainabilityInfo: {
            treesPlanted: 1,
            details: "Funds reforestation in the Western Ghats."
        }
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await productAPI.getAll();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const data = new FormData();
        files.forEach(file => data.append("images", file));

        try {
            setUploading(true);
            const { data: uploadedImages } = await productAPI.uploadImages(data);
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...uploadedImages]
            }));
        } catch (err) {
            alert("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (idx) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== idx)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await productAPI.update(currentId, formData);
            } else {
                await productAPI.create(formData);
            }
            setShowModal(false);
            resetForm();
            fetchProducts();
        } catch (err) {
            alert("Operation failed. Check if SKU is unique.");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "", sku: "", category: "Men", subCategory: "",
            description: "", fabric: "100% Pure Linen", dyeMethod: "",
            fit: "", price: "", images: [],
            sustainabilityInfo: { treesPlanted: 1, details: "Funds reforestation in the Western Ghats." }
        });
        setEditMode(false);
        setCurrentId(null);
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setCurrentId(product._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await productAPI.delete(id);
                fetchProducts();
            } catch (err) {
                alert("Delete failed");
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-serif text-preque-carbon">Inventory</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="flex items-center gap-2 px-6 py-3 bg-preque-carbon text-white text-xs tracking-widest uppercase font-bold hover:bg-black transition-colors"
                >
                    <Plus size={18} /> Add Product
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="bg-white shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-[10px] tracking-widest uppercase text-gray-400">
                                <th className="px-8 py-4">Product</th>
                                <th className="px-8 py-4">SKU</th>
                                <th className="px-8 py-4">Category</th>
                                <th className="px-8 py-4">Price</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-6 flex gap-4 items-center">
                                        <div className="w-12 h-16 bg-gray-100 relative overflow-hidden">
                                            {product.images[0] && <Image src={product.images[0].url} fill className="object-cover" alt="" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{product.name}</p>
                                            <p className="text-[10px] text-preque-earth uppercase tracking-[0.2em]">{product.subCategory}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500">{product.sku}</td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-light">{product.category}</td>
                                    <td className="px-8 py-6 text-sm font-medium">₹{product.price}</td>
                                    <td className="px-8 py-6 text-right space-x-4">
                                        <button onClick={() => handleEdit(product)} className="text-gray-400 hover:text-preque-carbon transition-colors"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto p-12">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-serif">{editMode ? "Edit Product" : "Add New Product"}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black">Close</button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Product Name</label>
                                    <input name="name" value={formData.name} onChange={handleInputChange} className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-preque-earth" required />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Category</label>
                                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-preque-earth">
                                            <option>Men</option>
                                            <option>Women</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Sub Category</label>
                                        <input name="subCategory" value={formData.subCategory} onChange={handleInputChange} placeholder="Shirts, Dresses..." className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-preque-earth" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Price (₹)</label>
                                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-preque-earth" required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">SKU Code</label>
                                        <input name="sku" value={formData.sku} onChange={handleInputChange} className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-preque-earth" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Dye Method</label>
                                        <input name="dyeMethod" value={formData.dyeMethod} onChange={handleInputChange} placeholder="Indigo, Turmeric..." className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-preque-earth" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Fit</label>
                                        <input name="fit" value={formData.fit} onChange={handleInputChange} placeholder="Relaxed, Slim..." className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-preque-earth" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full border border-gray-100 p-4 focus:outline-none focus:border-preque-earth resize-none text-sm" />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-4 block">Product Images</label>
                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                        {formData.images.map((img, idx) => (
                                            <div key={idx} className="relative aspect-[3/4] bg-gray-50 group">
                                                <Image src={img.url} fill className="object-cover" alt="" />
                                                <button type="button" onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className="aspect-[3/4] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
                                            disabled={uploading}
                                        >
                                            {uploading ? <Loader2 className="animate-spin text-gray-400" /> : <Plus size={20} className="text-gray-400" />}
                                        </button>
                                    </div>
                                    <input type="file" multiple ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                </div>

                                <div className="p-6 bg-preque-beige/30 space-y-4">
                                    <h4 className="text-[10px] tracking-widest uppercase font-bold">Sustainability Impact</h4>
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">Trees Planted</label>
                                        <input type="number" value={formData.sustainabilityInfo.treesPlanted} onChange={(e) => setFormData(p => ({ ...p, sustainabilityInfo: { ...p.sustainabilityInfo, treesPlanted: e.target.value } }))} className="w-full bg-transparent border-b border-gray-200 py-1 text-sm focus:outline-none" />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-5 bg-preque-carbon text-white text-xs tracking-[0.4em] uppercase font-bold hover:bg-black transition-all">
                                    {editMode ? "Update Product" : "Publish Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
