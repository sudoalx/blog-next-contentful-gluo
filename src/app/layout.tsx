import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "./components";
import { eina } from "./config/fonts";
import siteConfig from "../../config/site.config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={eina.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
