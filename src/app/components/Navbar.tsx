import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Gluo Dev Blog
        </Link>
        <ul className="flex space-x-4">
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
