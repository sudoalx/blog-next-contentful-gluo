import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import Link from "next/link";
import { Logo } from "../../branding";
import { MenuButton } from "./MenuButton";

export const Navigation = () => {
  
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
        <Sidebar  />
        <Navbar />
        <MenuButton  />
      </div>
    </nav>
  );
};
