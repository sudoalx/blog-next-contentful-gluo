import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={150}
            height={150}
            // responsive image
            className="object-contain w-24 sm:w-28"
          />
        </Link>
        <ul className="hidden space-x-4 sm:flex">
          <li>
            <Link href="#" className="">
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className="">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
