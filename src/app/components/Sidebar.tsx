import { fetchAllCategories } from "@/contentful/lib/catogories";
import Link from "next/link";
import { asm } from "../config/fonts";

export const Sidebar = async () => {
  const categories = await fetchAllCategories();

  return (
    <div className="lg:w-1/6 px-4 py-2 border-gray-200 rounded-lg">
      <h2 className={`text-xl font-semibold ${asm.className}`}>Categories</h2>
      <ul className="mt-2">
        {categories.map(({ category }) => (
          <li key={category} className="mt-2">
            <Link
              href={`/category/${category.toLowerCase()}`}
              className="border-b-4 pb-[2px] border-gray-200 hover:border-[#d2fc51] transition duration-300 ease-in-out"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
