import { Category, fetchAllCategories } from "@/contentful/lib/";
import { asm } from "@/app/config/fonts";
import { SidebarLink } from "./SidebarLink";
import { siteConfig } from "@/app/config";

interface CategoriesPageProps {
  categories?: Category[];
  params?: {
    category?: string;
  };
}

export const Sidebar = async ({
  categories,
  params,
}: Readonly<CategoriesPageProps>) => {
  if (!categories) {
    categories = await fetchAllCategories();
  }
  const { category: activeCategory } = params ?? {};

  return (
    <div
      className={`md:px-4 py-2 border-gray-200 rounded-lg ${
        siteConfig.postsGrid.sidebar.distribution === "side"
          ? "w-full lg:w-1/6"
          : "w-full"
      }`}
    >
      {siteConfig.postsGrid.sidebar.distribution === "side" && (
        <h2
          className={`text-xl font-semibold hidden lg:block ${asm.className}`}
        >
          Categories
        </h2>
      )}
      <div
        className={`${
          siteConfig.postsGrid.sidebar.distribution === "side"
            ? "capitalize h-full mt-2 lg:block flex-wrap whitespace-nowrap lg:whitespace-normal"
            : "capitalize whitespace-nowrap"
        }`}
      >
        <ul
          className={`h-full w-full flex gap-10 md:overflow-x-auto ${
            siteConfig.postsGrid.sidebar.distribution === "side"
              ? "lg:flex lg:flex-col lg:gap-2"
              : "lg:flex lg:overflow-x-auto"
          } pb-4`}
          style={{ overflowY: "hidden", boxSizing: "border-box" }}
        >
          {categories.map(({ category }: Category) => (
            <li key={category} className="mt-2">
              <SidebarLink
                category={category}
                activeCategory={activeCategory ?? ""}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
