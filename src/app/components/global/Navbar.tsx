"use client";
import Link from "next/link";
import { Logo } from "../branding/Logo";
import { GrLanguage } from "react-icons/gr";
import { asm } from "@/app/config/fonts";
import { useState } from "react";
import { siteConfig } from "@/app/config";

export const Navbar = () => {
  const [ToggleMenu, setToggleMenu] = useState<boolean>(false);
  const isActive = false;

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

        {/* Mobile Menu */}
        {ToggleMenu && (
          <MobileMenu ToggleMenu={ToggleMenu} setToggleMenu={setToggleMenu} />
        )}

        {/* Site Menu */}
        <ul className="hidden space-x-4 items-center md:flex">
          <li>
            <Link
              href="#"
              className={`${asm.className} py-4 w-full relative inline-block`}
            >
              Home
              {/* Active indicator */}
              {isActive && (
                <span className="absolute top-7 left-0 w-full h-4 bg-[#D2FC51] z-[-1]" />
              )}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`${asm.className} py-4 w-full relative inline-block`}
            >
              About
              {/* Active indicator */}
              {isActive && (
                <span className="absolute top-7 left-0 w-full h-4 bg-[#D2FC51] z-[-1]" />
              )}
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
          {siteConfig.navigation.showLanguageSwitch && (
            <button
              className={`px-4 py-2 h-8 bg-[#F7F7F7] rounded-full flex items-center text-sm ${asm.className}`}
            >
              <GrLanguage className="inline mr-2" />
              EN
            </button>
          )}
        </ul>
        <div className="md:hidden">
          <button onClick={() => setToggleMenu(!ToggleMenu)}>
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

const MobileMenu = ({
  ToggleMenu,
  setToggleMenu,
}: {
  ToggleMenu: boolean;
  setToggleMenu: (value: boolean) => void;
}) => {
  const isActive = true;
  return (
    // Full screen mobile menu
    <div className="md:hidden fixed inset-0 bg-white z-50 p-10">
      <div className="flex justify-between items-center w-full mb-8">
        {/* Language switch pill */}
        {siteConfig.navigation.showLanguageSwitch ? (
          <button
            className={`px-4 py-2 h-8 bg-[#F7F7F7] rounded-full flex items-center text-sm ${asm.className}`}
          >
            <GrLanguage className="inline mr-2" />
            EN
          </button>
        ) : (
          <div />
        )}

        {/* Close button */}
        <button onClick={() => setToggleMenu(!ToggleMenu)}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="mt-10">
        <ul className="text-xl flex flex-col w-full">
          <li>
            <Link
              href="#"
              className={`${asm.className} py-4 w-full relative inline-block`}
            >
              Home
              {/* Active indicator */}
              {isActive && (
                <span className="absolute top-7 left-0 w-full h-4 bg-[#D2FC51] z-[-1]" />
              )}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`${asm.className} py-4 w-full relative inline-block`}
            >
              About
              {/* Active indicator */}
              {isActive && (
                <span className="absolute top-7 left-0 w-full h-4 bg-[#D2FC51] z-[-1]" />
              )}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`${asm.className} py-4 w-full relative inline-block`}
            >
              Contact
              {/* Active indicator */}
              {isActive && (
                <span className="absolute top-7 left-0 w-full h-4 bg-[#D2FC51] z-[-1]" />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
