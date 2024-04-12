import Link from "next/link";
import { Logo } from "./branding/Logo";
import { asm } from "../config/fonts";

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
        <ul className="hidden space-x-4 sm:flex">
          <li>
            <Link href="#" className={`${asm.className}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className={`${asm.className}`}>
              About
            </Link>
          </li>
          <li>
            <Link href="#" className={`${asm.className}`}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
