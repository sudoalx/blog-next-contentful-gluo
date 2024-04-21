import { Grid } from "@/app/components/layout/PostsGrid";
import { Sidebar } from "@/app/components";
import { einaLight } from "@/app/config/fonts";
import { fetchBlogPosts } from "@/contentful/lib/blogPosts";
import { draftMode } from "next/headers";

interface CategoriesPageProps {
  params: {
    category: string;
  };
}
export default async function Home({ params }: Readonly<CategoriesPageProps>) {
  const blogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled });
  
  return (
    <main className="container mx-auto mb-10">
      {/* Blog homepage */}
      {/* Blog homepage heading */}
      <h1 className={`text-5xl mb-10 mt-20 eina-light ${einaLight.className}`}>
        Blog
      </h1>
      <div className="p-4 flex flex-col-reverse lg:flex gap-2 lg:flex-row">
        {/* Grid of articles */}
        <Grid blogPosts={blogPosts} />
        {/* Sidebar */}
        <Sidebar params={params} />
      </div>
    </main>
  );
}
