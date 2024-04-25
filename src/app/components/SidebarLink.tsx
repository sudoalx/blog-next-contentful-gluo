import Link from "next/link";

interface SidebarLinkProps {
  category: string;
  activeCategory: string;
}

export const SidebarLink = ({ category, activeCategory }: SidebarLinkProps) => {
  const isActive =
    category.toLowerCase() === decodeURI(activeCategory).toLowerCase();
  return (
    <Link
      href={`/category/${category.toLowerCase().replaceAll(" ", "-")}`}
      className={`border-b-4 pb-[2px]  hover:border-[#d2fc51] transition duration-300 ease-in-out ${
        isActive ? "border-[#d2fc51]" : "border-gray-200"
      }`}
    >
      {category}
    </Link>
  );
};
