import { Inter } from "next/font/google";
import localFont from "next/font/local";
export const inter = Inter({ subsets: ["latin"] });

export const eina = localFont({
  src: "../fonts/Eina02-Regular.woff2",
  variable: "--font-eina",
});

export const einaLight = localFont({
  src: "../fonts/Eina02-Light.woff2",
  variable: "--font-eina-light",
});

export const asm = localFont({
  src: "../fonts/ASM-Regular.woff2",
  variable: "--font-asm",
});
