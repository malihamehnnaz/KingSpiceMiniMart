import type { Metadata } from "next";
import { Outfit, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kings Spice Mini Mart - Authentic Indian Groceries in Sydney",
  description: "Your one-stop shop for authentic Indian spices, groceries, frozen foods, and daily essentials in Pendle Hill, Sydney.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${openSans.variable} font-body antialiased flex flex-col min-h-screen bg-white`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
