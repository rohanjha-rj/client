import { products as localProducts } from "@/data/products";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = localProducts.find(p => p._id === id);

    if (!product) {
        return {
            title: "Product Not Found | Preque",
            description: "The requested sustainable garment could not be found."
        };
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: `${product.name} | Preque`,
            description: product.description,
            images: [
                {
                    url: product.images[0]?.url,
                    alt: product.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: product.name,
            description: product.description,
            images: [product.images[0]?.url],
        },
    };
}

export default async function ProductPage({ params }) {
    const { id } = await params;
    const product = localProducts.find(p => p._id === id);

    if (!product) {
        return (
            <div className="text-center py-40 bg-preque-beige min-h-screen">
                <p className="text-gray-400 font-sans tracking-widest uppercase text-xs italic">The conscious choice you seek is not here.</p>
            </div>
        );
    }

    // Find related products
    const relatedProducts = localProducts
        .filter(p => p.category === product.category && p._id !== product._id)
        .slice(0, 3);

    // Complete the Look
    const bundledItems = localProducts
        .filter(p => p.tags.some(t => product.tags.includes(t)) && p._id !== product._id)
        .slice(0, 2);

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.images.map(img => img.url),
        "description": product.description,
        "sku": product.sku,
        "brand": {
            "@type": "Brand",
            "name": "PREQUE"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://preque.com/product/${product._id}`,
            "priceCurrency": "INR",
            "price": product.price,
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailsClient
                product={product}
                relatedProducts={relatedProducts}
                bundledItems={bundledItems}
                recentlyViewed={[]} // Will be handled on client
            />
        </>
    );
}
