import { Sidebar, Grid } from "@/app/components";
import { CategoryBreadcrumbs } from "@/app/components/categories/CategoryBreadcrumbs";
import { siteConfig } from "@/app/config";
import { einaLight } from "@/app/config/fonts";
import {
  fetchBlogPostsByCategory,
  fetchAllCategories,
} from "@/contentful/lib/";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SlArrowRight } from "react-icons/sl";

interface CategoriesPageProps {
  params: {
    category: string;
  };
}

export default async function CategoriesPage({
  params,
}: Readonly<CategoriesPageProps>) {
  // Get the category from the URL
  const { category } = params;

  /* 
    decodeURI is used to decode the category name and 
    replace all hyphens with spaces to properly match the category name
  */
  const decodedCategory = decodeURI(category).replaceAll("-", " ");

  const categories = await fetchAllCategories();

  /*
    Categories are returned as an array of objects
    with a key of `category` that contains the category name as a string
    and a key of `categoryId` that contains the category ID as a string
    [
      { category: "backend", categoryId: "6Xenc35CUeXMoYFttl7LrB" },
      { category: "cloud computing", categoryId: "5EZFcUrfmClTRZUR8bre0o" },
      ...
    ];
  */

  // Find the categoryId for the current category passed in as a parameter
  const currentCategory = categories.find(
    (cat) => cat.category === decodedCategory
  );

  // Fetch blog posts by categoryId
  const blogPosts = await fetchBlogPostsByCategory(
    currentCategory?.categoryId ?? null
  );

  // If no blog posts are found, return a 404 page
  if (!blogPosts.length) {
    return redirect("/");
  }

  return (
    <main className="container mx-auto mb-10">
      {/* Blog category breadcrumb */}
      <CategoryBreadcrumbs decodedCategory={decodedCategory} />
      {/* Blog categories content */}
      <div
        className={`p-4 flex flex-col-reverse lg:flex ${
          siteConfig.postsGrid.sidebar.distribution == "side"
            ? "lg:flex-row"
            : "lg:flex-col-reverse"
        } gap-2`}
      >
        {/* Grid of articles */}
        <Grid blogPosts={blogPosts} />
        {/* Sidebar */}
        <Sidebar categories={categories} params={params} />
      </div>
    </main>
  );
}
