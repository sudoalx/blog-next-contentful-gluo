import { fetchAllCategories } from "@/contentful/lib/catogories";
import Link from "next/link";
import { asm } from "../config/fonts";

interface CategoriesPageProps {
  params: {
    category: string;
  };
}

export const Sidebar = async ({ params }: Readonly<CategoriesPageProps>) => {
  const categories = await fetchAllCategories();
  const { category: activeCategory } = params;

  return (
    <div className="lg:w-1/6 px-4 py-2 border-gray-200 rounded-lg">
      <h2 className={`text-xl font-semibold hidden lg:block ${asm.className}`}>
        Categories
      </h2>
      <ul className="mt-2 flex gap-4 lg:block flex-wrap">
        {categories.map(({ category }) => (
          <li key={category} className="mt-2">
            <Link
              href={`/category/${category.toLowerCase()}`}
              className={`border-b-4 pb-[2px] border-gray-200 hover:border-[#d2fc51] transition duration-300 ease-in-out ${
                decodeURI(activeCategory).toLowerCase() ===
                category.toLowerCase()
                  ? "border-[#d2fc51]"
                  : ""
              }`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
