import { Grid } from "@/app/components/layout/PostsGrid";
import { Sidebar } from "@/app/components";
import { einaLight } from "@/app/config/fonts";
import { fetchBlogPosts } from "@/contentful/lib/blogPosts";
import { draftMode } from "next/headers";
import { fetchAllCategories } from "@/contentful/lib/catogories";

interface CategoriesPageProps {
  params: {
    category: string;
  };
}
export default async function Home({ params }: Readonly<CategoriesPageProps>) {
  const blogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled });
  const categories = await fetchAllCategories();

  return (
    <main className="container mx-auto mb-10">
      {/* Blog homepage */}
      {/* Blog homepage heading */}
      <h1
        className={`text-5xl mb-10 mt-20 mx-4 eina-light ${einaLight.className} font-normal`}
      >
        Blog
      </h1>
      <div className="p-4 flex flex-col-reverse lg:flex gap-2 lg:flex-row">
        {/* Grid of articles */}
        <Grid blogPosts={blogPosts} />
        {/* Sidebar */}
        <Sidebar categories={categories} params={params} />
      </div>
    </main>
  );
}
