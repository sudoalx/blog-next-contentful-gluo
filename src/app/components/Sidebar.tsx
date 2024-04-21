import { fetchAllCategories } from "@/contentful/lib/catogories";
import { asm } from "../config/fonts";
import { SidebarLink } from "./SidebarLink";

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
      <ul className="mt-2 flex gap-4 lg:block flex-wrap capitalize">
        {categories.map(({ category }) => (
          <li key={category} className="mt-2">
            <SidebarLink category={category} activeCategory={activeCategory} />
          </li>
        ))}
      </ul>
    </div>
  );
};
