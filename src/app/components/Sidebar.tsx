import { Category } from "@/contentful/lib/catogories";
import { asm } from "../config/fonts";
import { SidebarLink } from "./SidebarLink";

interface CategoriesPageProps {
  categories: Category[];
  params: {
    category: string;
  };
}

export const Sidebar = async ({
  categories = [],
  params,
}: Readonly<CategoriesPageProps>) => {
  const { category: activeCategory } = params;

  return (
    <div className="lg:w-1/6 md:px-4 py-2 border-gray-200 rounded-lg">
      <h2 className={`text-xl font-semibold hidden lg:block ${asm.className}`}>
        Categories
      </h2>
      <div className="h-full mt-2 lg:block flex-wrap capitalize whitespace-nowrap lg:whitespace-normal">
        <ul
          className="h-full flex lg:block gap-10 md:overflow-x-auto lg:flex-col pb-4"
          style={{ overflowY: "hidden", boxSizing: "border-box" }}
        >
          {categories.map(({ category }) => (
            <li key={category} className="mt-2">
              <SidebarLink
                category={category}
                activeCategory={activeCategory}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
