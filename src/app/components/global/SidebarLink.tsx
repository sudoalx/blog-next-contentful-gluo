import Link from "next/link";
import slugify from "slugify";

interface SidebarLinkProps {
  category: string;
  activeCategory: string;
}

export const SidebarLink = ({ category, activeCategory }: SidebarLinkProps) => {
  const isActive =
    category.toLowerCase() ===
    decodeURI(activeCategory).toLowerCase().replaceAll("-", " ");
  return (
    <Link
      href={`/category/${slugify(category)}`}
      className={`border-b-4 pb-[2px]  hover:border-[#d2fc51] transition duration-300 ease-in-out ${
        isActive ? "border-[#d2fc51]" : "border-gray-200"
      }`}
    >
      {category.replaceAll("-", " ")}
    </Link>
  );
};
