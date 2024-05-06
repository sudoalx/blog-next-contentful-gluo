import { siteConfig } from "@/app/config";
import React from "react";
import { GrLanguage } from "react-icons/gr";
import { NavbarItemsMobile } from "./NavbarItems";
import { asm } from "@/app/config/fonts";

export const Sidebar = (): JSX.Element => {
  const isOpen = false;
  return (
    <div
      className={`md:hidden fixed inset-0 bg-white z-50 p-10 ${
        isOpen ? "block" : "hidden"
      }`}
    >
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
      </div>

      <div className="mt-10">
        <ul className="text-xl flex flex-col w-full">
          {/* Navigation items */}
          <NavbarItemsMobile />
        </ul>
      </div>
    </div>
  );
};
