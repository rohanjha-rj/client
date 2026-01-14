import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { WishlistProvider } from "@/context/WishlistContext";
import ExitIntentModal from "@/components/layout/ExitIntentModal";
import Script from "next/script";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Preque | Sustainable Fashion Meets Luxury",
    template: "%s | Preque"
  },
  description: "Pure linen & natural dye garments for men and women. Sustainable fashion with a premium storytelling experience.",
  keywords: ["sustainable fashion", "luxury linen", "natural dye", "ethical clothing", "handcrafted garments"],
  authors: [{ name: "Preque Team" }],
  creator: "Preque",
  publisher: "Preque",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Preque | Sustainable Fashion Meets Luxury",
    description: "Pure linen & natural dye garments for men and women. Sustainable fashion with a premium storytelling experience.",
    url: "https://preque.com",
    siteName: "Preque",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Preque Luxury Sustainable Fashion",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preque | Sustainable Fashion Meets Luxury",
    description: "Pure linen & natural dye garments for men and women.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

import { ToastProvider } from "@/context/ToastContext";
import CustomCursor from "@/components/ui/CustomCursor";
import SustainabilityBadge from "@/components/ui/SustainabilityBadge";
import PageProgress from "@/components/ui/PageProgress";
import { AnimatePresence } from "framer-motion";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <WishlistProvider>
                <CartProvider>
                  <CustomCursor />
                  <PageProgress />
                  <SustainabilityBadge />
                  <ExitIntentModal />
                  <AnimatePresence mode="wait">
                    {children}
                  </AnimatePresence>
                </CartProvider>
              </WishlistProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
