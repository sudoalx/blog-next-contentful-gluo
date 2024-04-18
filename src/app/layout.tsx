import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "./components";
import { eina } from "./config/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gluo Dev Blog",
  description: "A blog for developers at Gluo",
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
