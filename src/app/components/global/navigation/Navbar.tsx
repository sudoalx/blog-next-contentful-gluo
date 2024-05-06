import Link from "next/link";
import { Logo } from "../../branding/Logo";
import { GrLanguage } from "react-icons/gr";
import { asm } from "@/app/config/fonts";
import { siteConfig } from "@/app/config";
import { NavbarItems } from "./NavbarItems";

export const Navbar = () => {
  return (
    

        
        <ul className="hidden space-x-4 items-center md:flex">
          {/* Navigation items */}
          <NavbarItems />

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
    
  );
};
