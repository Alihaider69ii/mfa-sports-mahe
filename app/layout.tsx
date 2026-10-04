import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIWidgetMount } from "@/components/AIWidgetMount";
import { LoginModal } from "@/components/LoginModal";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { getCategories } from "@/lib/data";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030d08",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mfasportsmahe.com"),
  title: {
    default: "MFA Sports Mahe | Kerala's Football & Cricket Jersey Store",
    template: "%s | MFA Sports Mahe",
  },
  description:
    "Fast, bold football kits, player versions, embroidery jerseys, retro classics, and custom team jerseys from Mahe, Kerala. Free all-India delivery above ₹399.",
  openGraph: {
    title: "MFA Sports Mahe | Kerala's Football & Cricket Jersey Store",
    description:
      "Bold matchday kits, player editions, retro jerseys & custom team apparel from Mahe, Kerala. Free delivery over ₹399.",
    url: "https://mfasportsmahe.com",
    siteName: "MFA Sports Mahe",
    images: [
      {
        url: "/img/logo.png",
        width: 800,
        height: 400,
        alt: "MFA Sports Mahe",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/img/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getCategories();

  return (
    <html lang="en">
      <body className="bg-pitch-black text-slate-100 font-body min-h-screen flex flex-col antialiased selection:bg-volt selection:text-pitch-black pb-14 sm:pb-0">
        <Header categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer categories={categories} />
        <LoginModal />
        <MobileBottomNav />
        <AIWidgetMount />
      </body>
    </html>
  );
}
