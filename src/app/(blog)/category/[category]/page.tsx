import { Sidebar, Grid } from "@/app/components";
import { CategoryBreadcrumbs } from "@/app/components/categories/CategoryBreadcrumbs";
import { siteConfig } from "@/app/config";
import {
  fetchBlogPostsByCategory,
  fetchAllCategories,
} from "@/contentful/lib/";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface CategoriesPageParams {
  category: string;
}

interface CategoriesPageProps {
  params: CategoriesPageParams;
}

export async function generateStaticParams(): Promise<CategoriesPageParams[]> {
  const categories = await fetchAllCategories();

  return categories.map((category) => ({ category: category.category }));
}

export async function generateMetadata({
  params,
}: Readonly<CategoriesPageProps>): Promise<Metadata> {
  // Decode the category name, replace hyphens with spaces and capitalize the first letter of each word
  const category = decodeURI(params.category)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${category} | Blog`,
    description: `All blog posts in the ${category} category.`,
  };
}

export default async function CategoriesPage({
  params,
}: Readonly<CategoriesPageProps>) {
  /* 
    decodeURI is used to decode the category name and 
    replace all hyphens with spaces to properly match the category name
  */
  const category = decodeURI(params.category).replaceAll("-", " ");

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
  const currentCategory = categories.find((cat) => cat.category === category);

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
      <CategoryBreadcrumbs decodedCategory={category} />
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
