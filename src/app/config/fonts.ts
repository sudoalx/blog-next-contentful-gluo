import { Inter } from "next/font/google";
import localFont from "next/font/local";
export const inter = Inter({ subsets: ["latin"] });

export const elina = localFont({
  src: "../fonts/Eina02-Regular.woff2",
  variable: "--font-eina",
});
