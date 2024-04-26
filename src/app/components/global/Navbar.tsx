import Link from "next/link";
import { Logo } from "../branding/Logo";
import { GrLanguage } from "react-icons/gr";
import { asm } from "@/app/config/fonts";

export const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold flex justify-center items-center"
        >
          <Logo />
        </Link>

        {/* Site Menu */}
        <ul className="hidden space-x-4 items-center md:flex">
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
        <div className="md:hidden">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
