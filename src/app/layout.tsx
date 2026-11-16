import type { Metadata } from "next";
import { Exo } from "next/font/google";
import { Suspense } from "react";
import { CartProvider } from "@/components/CartProvider/CartProvider";
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { SessionNavbar } from "@/components/SessionNavbar/SessionNavbar";
import { Toaster } from "@/components/Toaster/Toaster";
import { WishlistProvider } from "@/components/WishlistProvider/WishlistProvider";
import "./globals.css";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Shop fresh groceries and everyday essentials at FreshCart.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${exo.variable} h-full antialiased`}>
      {/* Browser extensions can add body attributes before React hydrates. */}
      <body
        className={`${exo.className} min-h-full flex flex-col`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:p-3">
          Skip to content
        </a>
        <CartProvider>
          <WishlistProvider>
            <Suspense fallback={<Navbar />}>
              <SessionNavbar />
            </Suspense>
            {children}
          </WishlistProvider>
        </CartProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
