"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-preque-beige">
      <Navbar />
      <Hero />

      {/* Sustainability Story Section */}
      <section className="py-32 px-6 md:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-7xl font-serif text-preque-carbon mb-10 leading-[1.1]">
              A commitment <br /> to the earth.
            </h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed font-sans max-w-lg">
              At Preque, we believe fashion should be a force for good. Our garments are crafted from 100% pure linen—a fiber that requires minimal water and no pesticides. Every piece is hand-dyed using plant-based dyes, ensuring that your style never comes at the cost of the environment.
            </p>
            <div className="flex items-center gap-12 border-t border-gray-100 pt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="block text-4xl font-serif text-preque-earth mb-1">1</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-bold">Tree planted / order</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="block text-4xl font-serif text-preque-earth mb-1">100%</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-bold">Natural Plant Dyes</span>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="flex-1 w-full h-[700px] relative"
          >
            <div className="absolute -inset-8 bg-preque-beige/40 -z-0 rounded-full blur-3xl" />
            <div className="relative h-full w-full overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group">
              <Image
                src="https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Natural dyeing process"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 bg-preque-beige">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1 }}
            className="text-5xl font-serif text-preque-carbon mb-6 tracking-wider uppercase"
          >
            Curated Collections
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-preque-earth mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/category/men" className="group relative h-[800px] block overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1611470748921-539d32443457?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Men's Linen"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute bottom-16 left-16">
                <Magnetic>
                  <div className="p-4">
                    <h3 className="text-4xl font-serif text-white mb-4 tracking-[0.2em]">MEN</h3>
                    <span className="text-white text-[10px] tracking-[0.4em] uppercase border-b border-white/40 pb-2 group-hover:border-white transition-colors">Shop Collection</span>
                  </div>
                </Magnetic>
              </div>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/category/women" className="group relative h-[800px] block overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Women's Linen"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute bottom-16 left-16">
                <Magnetic>
                  <div className="p-4">
                    <h3 className="text-4xl font-serif text-white mb-4 tracking-[0.2em]">WOMEN</h3>
                    <span className="text-white text-[10px] tracking-[0.4em] uppercase border-b border-white/40 pb-2 group-hover:border-white transition-colors">Shop Collection</span>
                  </div>
                </Magnetic>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <h2 className="text-4xl font-serif text-preque-carbon mb-2">Featured Pieces</h2>
              <div className="h-[1px] w-20 bg-preque-earth" />
            </div>
            <Link href="/category/all" className="text-xs uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-preque-earth hover:border-preque-earth transition-colors">
              View All
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                _id: "featured-1",
                name: "Classic Linen Shirt",
                price: 4500,
                fabric: "100% Linen",
                dyeMethod: "Indigo Plant Dye",
                isNewArrival: true,
                images: [{ url: "https://images.unsplash.com/photo-1611470748921-539d32443457?auto=format&fit=crop&q=80&w=1000" }]
              },
              {
                _id: "featured-2",
                name: "Wide Leg Trousers",
                price: 5800,
                fabric: "Organic Linen",
                dyeMethod: "Madder Root",
                isNewArrival: false,
                images: [{ url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1000" }]
              },
              {
                _id: "featured-3",
                name: "Summer Tunic",
                price: 3200,
                fabric: "Raw Linen",
                dyeMethod: "Marigold Dye",
                isNewArrival: true,
                images: [{ url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000" }]
              }
            ].map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
