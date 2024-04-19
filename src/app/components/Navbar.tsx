import Link from "next/link";
import { Logo } from "./branding/Logo";
import { asm } from "../config/fonts";
import { GrLanguage } from "react-icons/gr";

export const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold flex justify-center items-center"
        >
          <Logo />
        </Link>
        <ul className="hidden space-x-4 items-center sm:flex">
          <li className="px-5 py-4">
            <Link href="#" className={`${asm.className} text-base`}>
              Home
            </Link>
          </li>
          <li className="px-5 py-4">
            <Link href="#" className={`${asm.className} text-base`}>
              About
            </Link>
          </li>
          <li className="px-5 py-4">
            <Link
              href="#"
              className={`${asm.className} text-base bg-[#D2FC51] px-6 py-4 rounded-lg`}
            >
              Contact
            </Link>
          </li>
          {/* Language switch pill */}
          <button
            className={`px-4 py-2 h-8 bg-[#F7F7F7] rounded-full flex items-center text-sm ${asm.className}`}
          >
            <GrLanguage className="inline mr-2" />
            EN
          </button>
        </ul>
      </div>
    </nav>
  );
};
