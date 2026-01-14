"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Search, Edit2, Trash2, Filter, Loader2, X, List, LayoutGrid } from "lucide-react";
import { productAPI } from "@/lib/api";
import Image from "next/image";
import DataTable from "@/components/admin/DataTable";

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

    const [viewMode, setViewMode] = useState('grid');


    const columns = [
        {
            header: "Product",
            accessor: "name",
            render: (product) => (
                <div className="flex gap-4 items-center">
                    <div className="w-10 h-14 bg-gray-100 relative overflow-hidden rounded-sm">
                        {product.images[0] && <Image src={product.images[0].url} fill className="object-cover" alt="" />}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-preque-carbon dark:text-white">{product.name}</p>
                        <p className="text-[10px] text-preque-earth uppercase tracking-[0.2em]">{product.subCategory}</p>
                    </div>
                </div>
            )
        },
        { header: "SKU", accessor: "sku", render: (p) => <span className="text-xs font-mono text-gray-500">{p.sku}</span> },
        { header: "Category", accessor: "category", render: (p) => <span className="text-xs text-gray-500">{p.category}</span> },
        { header: "Price", accessor: "price", render: (p) => <span className="text-sm font-bold">₹{p.price}</span> },
        {
            header: "Actions",
            accessor: "actions",
            render: (product) => (
                <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(product)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-preque-carbon dark:hover:text-white"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
            )
        }
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-preque-carbon dark:text-white">Inventory</h1>
                    <p className="text-xs text-gray-400 mt-1">Manage your product catalog</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 p-1 rounded-lg flex items-center gap-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-100 dark:bg-white/10 text-preque-carbon dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <List size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-white/10 text-preque-carbon dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                    </div>

                    <button
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-preque-carbon text-white dark:bg-white dark:text-black text-xs tracking-widest uppercase font-bold hover:opacity-90 transition-all shadow-lg rounded-lg"
                    >
                        <Plus size={16} /> Add Product
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-preque-earth" /></div>
            ) : viewMode === 'list' ? (
                <DataTable
                    title="Product List"
                    data={products}
                    columns={columns}
                    searchPlaceholder="Search products by name, SKU..."
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                {product.images[0] ? (
                                    <Image
                                        src={product.images[0].url}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt={product.name}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                    <button onClick={() => handleEdit(product)} className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-white text-preque-carbon"><Edit2 size={12} /></button>
                                    <button onClick={() => handleDelete(product._id)} className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-red-50 text-red-500"><Trash2 size={12} /></button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-sm font-bold text-preque-carbon dark:text-white truncate pr-2">{product.name}</h3>
                                        <p className="text-[10px] text-preque-earth uppercase tracking-widest">{product.category}</p>
                                    </div>
                                    <span className="text-sm font-serif">₹{product.price}</span>
                                </div>
                                <div className="pt-3 border-t border-gray-50 dark:border-white/5 flex justify-between items-center text-[10px] text-gray-400">
                                    <span className="font-mono">sku: {product.sku}</span>
                                    <span>{product.subCategory}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto p-12 rounded-2xl shadow-2xl border border-black/5 dark:border-white/10">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-serif text-preque-carbon dark:text-white">{editMode ? "Edit Product" : "Add New Product"}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black dark:hover:text-white"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Product Name</label>
                                    <input name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-preque-earth text-preque-carbon dark:text-white" required />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Category</label>
                                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-preque-earth text-preque-carbon dark:text-white">
                                            <option className="text-black">Men</option>
                                            <option className="text-black">Women</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Sub Category</label>
                                        <input name="subCategory" value={formData.subCategory} onChange={handleInputChange} placeholder="Shirts, Dresses..." className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-preque-earth text-preque-carbon dark:text-white" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Price (₹)</label>
                                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-preque-earth text-preque-carbon dark:text-white" required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">SKU Code</label>
                                        <input name="sku" value={formData.sku} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-preque-earth text-preque-carbon dark:text-white" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Dye Method</label>
                                        <input name="dyeMethod" value={formData.dyeMethod} onChange={handleInputChange} placeholder="Indigo, Turmeric..." className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-preque-earth text-preque-carbon dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Fit</label>
                                        <input name="fit" value={formData.fit} onChange={handleInputChange} placeholder="Relaxed, Slim..." className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-preque-earth text-preque-carbon dark:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full bg-transparent border border-gray-100 dark:border-white/10 p-4 focus:outline-none focus:border-preque-earth resize-none text-sm text-preque-carbon dark:text-white rounded-lg" />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-4 block">Product Images</label>
                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                        {formData.images.map((img, idx) => (
                                            <div key={idx} className="relative aspect-[3/4] bg-gray-50 dark:bg-white/5 rounded-lg overflow-hidden group">
                                                <Image src={img.url} fill className="object-cover" alt="" />
                                                <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <X size={10} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className="aspect-[3/4] border-2 border-dashed border-gray-100 dark:border-white/10 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                            disabled={uploading}
                                        >
                                            {uploading ? <Loader2 className="animate-spin text-gray-400" /> : <Plus size={20} className="text-gray-400" />}
                                        </button>
                                    </div>
                                    <input type="file" multiple ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                </div>

                                <div className="p-6 bg-preque-beige/30 dark:bg-white/5 rounded-xl space-y-4">
                                    <h4 className="text-[10px] tracking-widest uppercase font-bold text-preque-carbon dark:text-white">Sustainability Impact</h4>
                                    <div>
                                        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">Trees Planted</label>
                                        <input type="number" value={formData.sustainabilityInfo.treesPlanted} onChange={(e) => setFormData(p => ({ ...p, sustainabilityInfo: { ...p.sustainabilityInfo, treesPlanted: e.target.value } }))} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-1 text-sm focus:outline-none text-preque-carbon dark:text-white" />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-4 bg-preque-carbon text-white dark:bg-white dark:text-black text-xs tracking-[0.4em] uppercase font-bold hover:opacity-90 transition-all rounded-lg shadow-xl">
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
