export const products = [
    // ========== NEW MEN'S PRODUCTS (8 items) ==========
    {
        _id: "m-new-1",
        name: "Hemp Blend Sweater",
        sku: "PQ-M-OW-006",
        category: "Men",
        subCategory: "Outerwear",
        description: "Cozy hemp blend sweater in a textured knit. Breathable, antibacterial, and naturally dyed with sage leaves.",
        fabric: "55% Hemp, 45% Organic Cotton",
        dyeMethod: "Sage Leaf Dye",
        fit: "Relaxed Fit",
        price: 4200,
        colors: [
            { name: "Sage Green", hex: "#77815C" },
            { name: "Oatmeal", hex: "#E0DCC8" }
        ],
        sizes: [
            { size: "S", inventory: 8 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 6 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80", alt: "Hemp Sweater" }],
        isNewArrival: true,
        tags: ["hemp", "sweater", "knitwear"],
        reviews: [
            {
                _id: "r1",
                user: "Aarav P.",
                rating: 5,
                comment: "Absolutely love the fabric quality. It feels premium and breathable.",
                date: "2023-10-15"
            },
            {
                _id: "r2",
                user: "Ishaan K.",
                rating: 4,
                comment: "Great fit, but the sleeves are slightly long for me.",
                date: "2023-11-02"
            }
        ]
    },
    {
        _id: "m-new-2",
        name: "Charcoal Wool Coat",
        sku: "PQ-M-OW-007",
        category: "Men",
        subCategory: "Outerwear",
        description: "Structured wool coat made from recycled wool fibers. Dyed with iron vat for a deep charcoal hue.",
        fabric: "100% Recycled Wool",
        dyeMethod: "Iron Vat Dye",
        fit: "Regular Fit",
        price: 10500,
        colors: [
            { name: "Charcoal", hex: "#36454F" }
        ],
        sizes: [
            { size: "M", inventory: 5 },
            { size: "L", inventory: 8 },
            { size: "XL", inventory: 4 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1636114734837-20158ba57111?auto=format&fit=crop&q=80&w=2000", alt: "Wool Coat" }],
        isFeatured: true,
        tags: ["coat", "wool", "winter"]
    },
    {
        _id: "m-new-3",
        name: "Organic Denim Jacket",
        sku: "PQ-M-OW-008",
        category: "Men",
        subCategory: "Outerwear",
        description: "Classic trucker jacket in heavyweight organic cotton denim. Natural indigo dyed.",
        fabric: "100% Organic Cotton Denim",
        dyeMethod: "Natural Indigo",
        fit: "Standard Fit",
        price: 5999,
        colors: [
            { name: "Indigo", hex: "#4B0082" }
        ],
        sizes: [
            { size: "S", inventory: 6 },
            { size: "M", inventory: 10 },
            { size: "L", inventory: 8 },
            { size: "XL", inventory: 5 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=1000&q=80", alt: "Denim Jacket" }],
        tags: ["denim", "jacket", "classic"]
    },
    {
        _id: "m-new-4",
        name: "Heavyweight Eco Hoodie",
        sku: "PQ-M-OW-009",
        category: "Men",
        subCategory: "Outerwear",
        description: "Premium heavyweight hoodie with soft brushed interior. Dyed with low-impact earth pigments.",
        fabric: "100% Organic Cotton Fleece",
        dyeMethod: "Earth Pigments",
        fit: "Relaxed Fit",
        price: 3499,
        colors: [
            { name: "Stone", hex: "#8B8C7A" },
            { name: "Black", hex: "#111111" }
        ],
        sizes: [
            { size: "S", inventory: 10 },
            { size: "M", inventory: 15 },
            { size: "L", inventory: 12 },
            { size: "XL", inventory: 8 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?auto=format&fit=crop&w=1000&q=80", alt: "Eco Hoodie" }],
        isPopular: true,
        tags: ["hoodie", "casual", "warm"]
    },
    {
        _id: "m-new-5",
        name: "Bamboo Polo Shirt",
        sku: "PQ-M-SH-006",
        category: "Men",
        subCategory: "Shirts",
        description: "Ultra-soft polo made from bamboo viscose. Naturally moisture-wicking and cooling.",
        fabric: "95% Bamboo Viscose, 5% Spandex",
        dyeMethod: "Low Impact Reactive Dye",
        fit: "Slim Fit",
        price: 2499,
        colors: [
            { name: "Sky Blue", hex: "#87CEEB" },
            { name: "Navy", hex: "#000080" }
        ],
        sizes: [
            { size: "S", inventory: 8 },
            { size: "M", inventory: 14 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 6 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80", alt: "Bamboo Polo" }],
        tags: ["polo", "bamboo", "smart-casual"]
    },
    {
        _id: "m-new-6",
        name: "Linen Beach Shorts",
        sku: "PQ-M-TR-006",
        category: "Men",
        subCategory: "Trousers",
        description: "Lightweight linen shorts perfect for summer. Elastic waistband with drawstring.",
        fabric: "100% Linen",
        dyeMethod: "Pomegranate Dye",
        fit: "Regular Fit",
        price: 2200,
        colors: [
            { name: "Sand", hex: "#C2B280" },
            { name: "Coral", hex: "#FF7F50" }
        ],
        sizes: [
            { size: "S", inventory: 10 },
            { size: "M", inventory: 15 },
            { size: "L", inventory: 12 },
            { size: "XL", inventory: 8 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80", alt: "Linen Shorts" }],
        isPopular: true,
        tags: ["shorts", "summer", "beach"]
    },
    {
        _id: "m-new-7",
        name: "Cork Sole Sandals",
        sku: "PQ-M-AC-004",
        category: "Men",
        subCategory: "Accessories",
        description: "Durable sandals with natural cork footbed and upcycled rubber soles. Straps made from vegan leather (Piñatex).",
        fabric: "Cork, Upcycled Rubber, Piñatex",
        dyeMethod: "Natural Pigments",
        fit: "True to Size",
        price: 2800,
        colors: [
            { name: "Brown", hex: "#8B4513" },
            { name: "Black", hex: "#000000" }
        ],
        sizes: [
            { size: "8", inventory: 5 },
            { size: "9", inventory: 8 },
            { size: "10", inventory: 8 },
            { size: "11", inventory: 6 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1000&q=80", alt: "Cork Sandals" }],
        tags: ["sandals", "vegan", "summer"]
    },
    {
        _id: "m-new-8",
        name: "Upcycled Leather Wallet",
        sku: "PQ-M-AC-005",
        category: "Men",
        subCategory: "Accessories",
        description: "Minimalist wallet crafted from leather offcuts. Hand-stitched with waxed linen thread.",
        fabric: "Upcycled Leather",
        dyeMethod: "Vegetable Tan",
        fit: "One Size",
        price: 1500,
        colors: [
            { name: "Tan", hex: "#D2B48C" },
            { name: "Dark Brown", hex: "#654321" }
        ],
        sizes: [
            { size: "One Size", inventory: 20 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80", alt: "Leather Wallet" }],
        tags: ["wallet", "upcycled", "leather"]
    },

    // ========== NEW WOMEN'S PRODUCTS (8 items) ==========
    {
        _id: "w-new-1",
        name: "Bamboo Silk Cami",
        sku: "PQ-W-TP-004",
        category: "Women",
        subCategory: "Tops",
        description: "Silky soft camisole made from bamboo lyocell. Naturally cooling and gentle on skin.",
        fabric: "100% Bamboo Lyocell",
        dyeMethod: "Flower Petal Dye",
        fit: "Regular Fit",
        price: 1800,
        colors: [
            { name: "Ivory", hex: "#FFFFF0" },
            { name: "Rose", hex: "#FF007F" }
        ],
        sizes: [
            { size: "XS", inventory: 6 },
            { size: "S", inventory: 10 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 8 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1629160477511-e5e730a661ee?auto=format&fit=crop&q=80&w=2000", alt: "Bamboo Cami" }],
        tags: ["cami", "bamboo", "soft"]
    },
    {
        _id: "w-new-2",
        name: "Linen Summer Blouse",
        sku: "PQ-W-TP-005",
        category: "Women",
        subCategory: "Tops",
        description: "Breezy linen blouse with puffed sleeves. Dyed with marigold for a warm golden yellow.",
        fabric: "100% Linen",
        dyeMethod: "Marigold Dye",
        fit: "Loose Fit",
        price: 3200,
        colors: [
            { name: "Golden Yellow", hex: "#FFD700" },
            { name: "White", hex: "#FFFFFF" }
        ],
        sizes: [
            { size: "S", inventory: 8 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 6 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=1000&q=80", alt: "Linen Blouse" }],
        isNewArrival: true,
        tags: ["blouse", "summer", "linen"]
    },
    {
        _id: "w-new-3",
        name: "Wide Leg Culottes",
        sku: "PQ-W-BT-001",
        category: "Women",
        subCategory: "Bottoms",
        description: "Stylish high-waisted culottes in organic cotton twill. Comfortable and chic.",
        fabric: "100% Organic Cotton Twill",
        dyeMethod: "Clay Dye",
        fit: "Wide Leg",
        price: 3800,
        colors: [
            { name: "Terracotta", hex: "#E2725B" },
            { name: "Navy", hex: "#000080" }
        ],
        sizes: [
            { size: "XS", inventory: 6 },
            { size: "S", inventory: 10 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 8 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80", alt: "Culottes" }],
        isPopular: true,
        tags: ["culottes", "pants", "stylish"]
    },
    {
        _id: "w-new-4",
        name: "Organic Cotton Leggings",
        sku: "PQ-W-BT-002",
        category: "Women",
        subCategory: "Bottoms",
        description: "Soft and stretchy leggings made from GOTS certified organic cotton. Perfect for yoga or lounging.",
        fabric: "92% Organic Cotton, 8% Spandex",
        dyeMethod: "Low Impact Dye",
        fit: "Tight Fit",
        price: 2200,
        colors: [
            { name: "Black", hex: "#000000" },
            { name: "Grey", hex: "#808080" }
        ],
        sizes: [
            { size: "XS", inventory: 10 },
            { size: "S", inventory: 15 },
            { size: "M", inventory: 15 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 6 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=80", alt: "Leggings" }],
        tags: ["leggings", "yoga", "activewear"]
    },
    {
        _id: "w-new-5",
        name: "Tencel Maxi Dress",
        sku: "PQ-W-DR-006",
        category: "Women",
        subCategory: "Dresses",
        description: "Flowing maxi dress made from Tencel fibers. Features a tiered skirt and adjustable straps.",
        fabric: "100% Tencel Lyocell",
        dyeMethod: "Digital Print (Eco Inks)",
        fit: "Flowy",
        price: 6500,
        colors: [
            { name: "Floral Print", hex: "#FFC0CB" }
        ],
        sizes: [
            { size: "S", inventory: 8 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 10 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80", alt: "Maxi Dress" }],
        isFeatured: true,
        tags: ["dress", "maxi", "floral"]
    },
    {
        _id: "w-new-6",
        name: "Handwoven Silk Shawl",
        sku: "PQ-W-AC-004",
        category: "Women",
        subCategory: "Accessories",
        description: "Exquisite shawl handwoven by traditional artisans. Dyed with lac for deep red tones.",
        fabric: "100% Silk",
        dyeMethod: "Lac Dye",
        fit: "One Size",
        price: 4500,
        colors: [
            { name: "Ruby Red", hex: "#9B111E" }
        ],
        sizes: [
            { size: "One Size", inventory: 15 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80", alt: "Silk Shawl" }],
        tags: ["shawl", "luxury", "artisan"]
    },
    {
        _id: "w-new-7",
        name: "Satin Silk Scarf",
        sku: "PQ-W-AC-005",
        category: "Women",
        subCategory: "Accessories",
        description: "Square silk scarf with hand-rolled edges. Digitally printed with botanical illustrations.",
        fabric: "100% Silk Satin",
        dyeMethod: "Digital Print",
        fit: "One Size",
        price: 2600,
        colors: [
            { name: "Multicolor", hex: "#FF00FF" }
        ],
        sizes: [
            { size: "One Size", inventory: 25 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=1000&q=80", alt: "Silk Scarf" }],
        tags: ["scarf", "print", "accessory"]
    },
    {
        _id: "w-new-8",
        name: "Wool Beret",
        sku: "PQ-W-AC-006",
        category: "Women",
        subCategory: "Accessories",
        description: "Chic wool beret for a classic look. Warm and breathable.",
        fabric: "100% Wool",
        dyeMethod: "Standard Low Impact",
        fit: "One Size",
        price: 1800,
        colors: [
            { name: "Red", hex: "#FF0000" },
            { name: "Black", hex: "#000000" }
        ],
        sizes: [
            { size: "One Size", inventory: 20 }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80", alt: "Wool Beret" }],
        tags: ["beret", "hat", "classic"]
    },
    // ========== ORIGINAL MEN'S PRODUCTS (Sample) ==========
    {
        _id: "m-orig-1",
        name: "Classic White Linen Shirt",
        sku: "PQ-M-LS-001",
        category: "Men",
        subCategory: "Shirts",
        description: "A timeless essential crafted from the finest European linen. Naturally bleached for a crisp, clean look.",
        fabric: "100% Pure European Linen",
        dyeMethod: "Natural Bleach",
        fit: "Relaxed Fit",
        price: 3450,
        colors: [{ name: "White", hex: "#FFFFFF" }],
        sizes: [{ size: "M", inventory: 10 }, { size: "L", inventory: 8 }],
        images: [{ url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=2000", alt: "Classic Linen Shirt" }],
        isNewArrival: true,
        tags: ["sustainable", "linen", "indigo"],
        sustainabilityInfo: { details: "Linen requires minimal water." }
    },
    {
        _id: "m-orig-2",
        name: "Oxford Weave Organic Cotton Shirt",
        sku: "PQ-M-OS-002",
        category: "Men",
        subCategory: "Shirts",
        description: "Premium oxford weave shirt made from 100% organic cotton. Naturally dyed with pomegranate rinds.",
        fabric: "100% Organic Cotton Oxford",
        dyeMethod: "Pomegranate Rind Dye",
        fit: "Slim Fit",
        price: 2999,
        colors: [{ name: "White", hex: "#FFFFFF" }],
        sizes: [{ size: "M", inventory: 10 }, { size: "L", inventory: 5 }],
        images: [{ url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80", alt: "Oxford Shirt" }],
        isPopular: true,
        tags: ["organic", "oxford"],
        sustainabilityInfo: { details: "Organic cotton is pesticide-free." }
    },
    {
        _id: "m-orig-3",
        name: "Earth-Tone Linen Trousers",
        sku: "PQ-M-TR-001",
        category: "Men",
        subCategory: "Trousers",
        description: "Breathable linen trousers dyed with madder root for a deep earthy red tone.",
        fabric: "100% Pure Linen",
        dyeMethod: "Madder Root Dye",
        fit: "Straight Fit",
        price: 4200,
        colors: [{ name: "Red", hex: "#8B0000" }],
        sizes: [{ size: "32", inventory: 10 }, { size: "34", inventory: 8 }],
        images: [{ url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80", alt: "Linen Trousers" }],
        isPopular: true,
        tags: ["linen", "comfortable"],
        sustainabilityInfo: { details: "Natural dye reduces chemical runoff." }
    },
    {
        _id: "m-orig-4",
        name: "Indigo Hand-Loomed Jacket",
        sku: "PQ-M-JK-001",
        category: "Men",
        subCategory: "Outerwear",
        description: "A lightweight structural jacket made from hand-loomed linen and dyed in deep fermented indigo.",
        fabric: "100% Hand-Loomed Linen",
        dyeMethod: "Fermented Natural Indigo",
        fit: "Structured Fit",
        price: 8500,
        colors: [{ name: "Indigo", hex: "#4B0082" }],
        sizes: [{ size: "L", inventory: 5 }],
        images: [{ url: "https://images.unsplash.com/photo-1626454015258-3175c09b7769?auto=format&fit=crop&q=80&w=2000", alt: "Indigo Jacket" }],
        isFeatured: true,
        tags: ["handcrafted", "luxury"],
        sustainabilityInfo: { details: "Hand-loomed fabric supports artisans." }
    },

    // ========== ORIGINAL WOMEN'S PRODUCTS (Sample) ==========
    {
        _id: "w-orig-1",
        name: "Linen Wrap Dress",
        sku: "PQ-W-DR-001",
        category: "Women",
        subCategory: "Dresses",
        description: "Elegant wrap dress hand-dyed with Turmeric for a vibrant, safe, and natural yellow.",
        fabric: "100% Pure Linen",
        dyeMethod: "Turmeric Dye",
        fit: "Adjustable Wrap",
        price: 5800,
        colors: [{ name: "Yellow", hex: "#FFD700" }],
        sizes: [{ size: "S", inventory: 8 }, { size: "M", inventory: 10 }],
        images: [{ url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80", alt: "Wrap Dress" }],
        isNewArrival: true,
        tags: ["dress", "elegant"],
        sustainabilityInfo: { details: "Turmeric dye is non-toxic." }
    },
    {
        _id: "w-orig-2",
        name: "Earthy Hemp Kaftan",
        sku: "PQ-W-KF-002",
        category: "Women",
        subCategory: "Dresses",
        description: "Flowing kaftan made from a breathable hemp-linen blend, dyed with pomegranate skins.",
        fabric: "50% Hemp, 50% Linen",
        dyeMethod: "Pomegranate Skin Dye",
        fit: "Oversized",
        price: 6200,
        colors: [{ name: "Earth", hex: "#A0522D" }],
        sizes: [{ size: "One Size", inventory: 15 }],
        images: [{ url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80", alt: "Hemp Kaftan" }],
        isPopular: true,
        tags: ["kaftan", "resort"],
        sustainabilityInfo: { details: "Hemp is a low-water crop." }
    },
    {
        _id: "w-orig-3",
        name: "Linen Midi Skirt",
        sku: "PQ-W-SK-001",
        category: "Women",
        subCategory: "Outerwear",
        description: "Timeless midi skirt featuring a gentle flare and dyed with natural lac for a soft pink tone.",
        fabric: "100% Pure Linen",
        dyeMethod: "Lac Dye",
        fit: "A-Line",
        price: 4500,
        colors: [{ name: "Pink", hex: "#FFC0CB" }],
        sizes: [{ size: "S", inventory: 8 }, { size: "M", inventory: 10 }],
        images: [{ url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80", alt: "Midi Skirt" }],
        isPopular: true,
        tags: ["skirt", "feminine"],
        sustainabilityInfo: { details: "Lac is a natural resin dye." }
    },
    {
        _id: "w-orig-4",
        name: "Linen Peasant Blouse",
        sku: "PQ-W-BL-001",
        category: "Women",
        subCategory: "Tops",
        description: "Romantic peasant blouse with embroidered details. Made from soft linen and dyed with beetroot.",
        fabric: "100% Soft Linen",
        dyeMethod: "Beetroot Dye",
        fit: "Relaxed Fit",
        price: 3999,
        colors: [{ name: "Red", hex: "#8B0000" }],
        sizes: [{ size: "S", inventory: 10 }, { size: "M", inventory: 12 }],
        images: [{ url: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=1000&q=80", alt: "Peasant Blouse" }],
        isPopular: true,
        tags: ["blouse", "romantic"],
        sustainabilityInfo: { details: "Beetroot dye is biodegradable." }
    }
];
