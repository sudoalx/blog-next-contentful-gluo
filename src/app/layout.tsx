import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "./components";
import { eina } from "./config/fonts";
import { siteConfig } from "@/app/config";
import { Navigation } from "./components/global/navigation/Navigation";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={eina.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
