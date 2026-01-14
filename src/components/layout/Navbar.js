"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import { products as localProducts } from "@/data/products";

const megaMenus = {
    Men: {
        categories: [
            { name: "New Arrivals", href: "/category/men?sort=newest" },
            { name: "Outerwear", href: "/category/men?sub=Outerwear" },
            { name: "Shirts", href: "/category/men?sub=Shirts" },
            { name: "Trousers", href: "/category/men?sub=Trousers" },
            { name: "Accessories", href: "/category/men?sub=Accessories" },
        ],
        featured: {
            name: "The Hemp Collection",
            href: "/product/m-new-1",
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80"
        }
    },
    Women: {
        categories: [
            { name: "New Arrivals", href: "/category/women?sort=newest" },
            { name: "Tops", href: "/category/women?sub=Tops" },
            { name: "Bottoms", href: "/category/women?sub=Bottoms" },
            { name: "Dresses", href: "/category/women?sub=Dresses" },
            { name: "Accessories", href: "/category/women?sub=Accessories" },
        ],
        featured: {
            name: "Summer Linen",
            href: "/product/w-new-2",
            image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=1000&q=80"
        }
    }
};

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [searchPreview, setSearchPreview] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeMenu, setActiveMenu] = useState(null);
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const { playSound } = useToast();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show/Hide logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            setScrolled(currentScrollY > 20);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            setShowSearch(false);
            router.push(`/search?q=${searchQuery}`);
        }
    };

    const navLinks = [
        { name: "Men", href: "/category/men" },
        { name: "Women", href: "/category/women" },
        { name: "Story", href: "/story" },
        { name: "Sustainability", href: "/sustainability" },
    ];

    return (
        <motion.nav
            onMouseLeave={() => setActiveMenu(null)}
            animate={{ y: visible ? 0 : -100 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled || activeMenu || !isHome ? 'bg-white/90 backdrop-blur-xl shadow-sm dark:bg-black/90 border-b border-black/5 dark:border-white/5' : 'bg-transparent'} py-4`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ... existing header content ... */}
                <div className="flex justify-between items-center">
                    {/* Mobile Menu Icon */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={() => setIsOpen(true)} className="text-preque-carbon dark:text-white">
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Desktop Nav Links (Left) */}
                    <div className="hidden md:flex space-x-8 items-center h-full">
                        {navLinks.slice(0, 2).map((link) => (
                            <div
                                key={link.name}
                                onMouseEnter={() => megaMenus[link.name] && setActiveMenu(link.name)}
                                className="relative h-full flex items-center"
                            >
                                <Link
                                    href={link.href}
                                    className="text-preque-carbon hover:text-preque-earth dark:text-white dark:hover:text-preque-earth transition-colors font-medium text-sm tracking-widest uppercase py-4"
                                >
                                    {link.name}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Logo (Center) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/" className="text-3xl font-serif font-bold tracking-[0.2em] text-preque-carbon dark:text-white">
                            PREQUE
                        </Link>
                    </div>

                    {/* Icons & Story (Right) */}
                    <div className="flex items-center space-x-6">
                        <div className="hidden lg:flex space-x-8 items-center mr-8">
                            {navLinks.slice(2).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-preque-carbon hover:text-preque-earth dark:text-white dark:hover:text-preque-earth transition-colors font-medium text-sm tracking-widest uppercase"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <button onClick={toggleTheme} className="text-preque-carbon hover:text-preque-earth dark:text-white dark:hover:text-preque-earth transition-colors">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={() => setShowSearch(true)}
                            onMouseEnter={() => {
                                setSearchPreview(true);
                                playSound('click');
                            }}
                            onMouseLeave={() => setSearchPreview(false)}
                            className="text-preque-carbon hover:text-preque-earth dark:text-white dark:hover:text-preque-earth transition-colors relative"
                        >
                            <Search size={20} />
                            <AnimatePresence>
                                {searchPreview && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute top-full mt-4 right-0 bg-white dark:bg-black border border-black/5 dark:border-white/5 p-3 shadow-2xl z-[60] w-48 pointer-events-none"
                                    >
                                        <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400 mb-1">Quick Search</p>
                                        <p className="text-[11px] text-preque-carbon dark:text-white font-serif italic">Discover the collection</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                        <Link href="/profile" className="text-preque-carbon hover:text-preque-earth dark:text-white dark:hover:text-preque-earth transition-colors">
                            <User size={20} />
                        </Link>
                        <Link href="/cart" className="text-preque-carbon hover:text-preque-earth dark:text-white dark:hover:text-preque-earth transition-colors relative">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-preque-earth text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mega Menu Overlay */}
            <AnimatePresence>
                {activeMenu && megaMenus[activeMenu] && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-t border-gray-100 dark:border-white/5 shadow-2xl z-40"
                    >
                        <div className="max-w-7xl mx-auto px-8 py-12">
                            <div className="grid grid-cols-4 gap-8">
                                {/* Categories Column */}
                                <div className="col-span-1">
                                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">Shop {activeMenu}</h3>
                                    <div className="flex flex-col space-y-4">
                                        {megaMenus[activeMenu].categories.map((cat) => (
                                            <Link
                                                key={cat.name}
                                                href={cat.href}
                                                onClick={() => setActiveMenu(null)}
                                                className="text-preque-carbon dark:text-gray-300 hover:text-preque-earth dark:hover:text-white transition-colors text-sm font-medium"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Placeholder Columns for Rich Content */}
                                <div className="col-span-1">
                                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">Collections</h3>
                                    <div className="flex flex-col space-y-4">
                                        <Link href="#" className="text-sm text-gray-500 hover:text-preque-earth">Spring 2024</Link>
                                        <Link href="#" className="text-sm text-gray-500 hover:text-preque-earth">Essentials</Link>
                                        <Link href="#" className="text-sm text-gray-500 hover:text-preque-earth">Preque Exclusives</Link>
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <div className="col-span-2 relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                                    <Link href={megaMenus[activeMenu].featured.href} onClick={() => setActiveMenu(null)}>
                                        <Image
                                            src={megaMenus[activeMenu].featured.image}
                                            alt={megaMenus[activeMenu].featured.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                        <div className="absolute bottom-6 left-6 text-white">
                                            <p className="text-xs tracking-widest uppercase mb-2">Featured</p>
                                            <h4 className="text-2xl font-serif">{megaMenus[activeMenu].featured.name}</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white dark:bg-black z-[70] p-6 md:p-12 overflow-y-auto"
                    >
                        <div className="max-w-4xl mx-auto relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowSearch(false)}
                                className="absolute right-0 top-0 p-4 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                            >
                                <X size={32} />
                            </button>

                            {/* Input */}
                            <input
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Search our collections..."
                                className="w-full text-3xl md:text-5xl font-serif border-b-2 border-gray-100 dark:border-gray-800 py-6 mb-12 focus:outline-none focus:border-preque-earth bg-transparent text-preque-carbon dark:text-preque-beige transition-colors uppercase tracking-wider"
                            />

                            {/* Results Area */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                                {/* Quick Links / Filter Links */}
                                <div className="md:col-span-3 space-y-8">
                                    <div>
                                        <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Quick Links</h4>
                                        <div className="flex flex-col space-y-3">
                                            <Link href="/category/men" onClick={() => setShowSearch(false)} className="text-sm font-medium hover:text-preque-earth transition-colors">Men's Collection</Link>
                                            <Link href="/category/women" onClick={() => setShowSearch(false)} className="text-sm font-medium hover:text-preque-earth transition-colors">Women's Collection</Link>
                                            <Link href="/sustainability" onClick={() => setShowSearch(false)} className="text-sm font-medium hover:text-preque-earth transition-colors">Our Story</Link>
                                        </div>
                                    </div>
                                    {searchQuery && (
                                        <div>
                                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Filters</h4>
                                            <p className="text-xs text-gray-500">Showing results for "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>

                                {/* Product Results */}
                                <div className="md:col-span-9">
                                    {searchQuery ? (
                                        <div className="space-y-6">
                                            {localProducts.filter(p =>
                                                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                                            ).slice(0, 5).map(product => (
                                                <Link
                                                    key={product._id}
                                                    href={`/product/${product._id}`}
                                                    onClick={() => setShowSearch(false)}
                                                    className="flex items-center gap-6 group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                                >
                                                    <div className="w-20 h-24 relative overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <Image
                                                            src={product.images[0].url}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-lg font-serif text-preque-carbon dark:text-white group-hover:text-preque-earth transition-colors mb-1">{product.name}</h5>
                                                        <p className="text-sm text-gray-500 mb-2">{product.category} / {product.subCategory}</p>
                                                        <p className="text-sm font-medium">₹{product.price}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                            {localProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                                <p className="text-gray-400 font-serif italic text-lg">No matches found.</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">Trending Now</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                                {localProducts.filter(p => p.isPopular).slice(0, 3).map(product => (
                                                    <Link
                                                        key={product._id}
                                                        href={`/product/${product._id}`}
                                                        onClick={() => setShowSearch(false)}
                                                        className="group"
                                                    >
                                                        <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-gray-100">
                                                            <Image
                                                                src={product.images[0].url}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                            />
                                                        </div>
                                                        <h5 className="text-sm font-medium truncate group-hover:text-preque-earth transition-colors">{product.name}</h5>
                                                        <p className="text-xs text-gray-500">₹{product.price}</p>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-white dark:bg-black z-[60] p-6 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-2xl font-serif font-bold tracking-widest text-preque-carbon dark:text-preque-beige">PREQUE</div>
                            <button onClick={() => setIsOpen(false)} className="text-preque-carbon dark:text-preque-beige">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-serif text-preque-carbon dark:text-preque-beige border-b border-gray-100 dark:border-gray-800 pb-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 mt-4">
                                <Link href="/profile" onClick={() => setIsOpen(false)} className="text-xl font-sans text-preque-carbon dark:text-preque-beige">Account</Link>
                                <Link href="/cart" onClick={() => setIsOpen(false)} className="text-xl font-sans text-preque-carbon dark:text-preque-beige">Cart ({cartCount})</Link>
                                <button
                                    onClick={() => { toggleTheme(); setIsOpen(false); }}
                                    className="text-xl font-sans text-left text-preque-carbon dark:text-preque-beige flex items-center gap-2"
                                >
                                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
