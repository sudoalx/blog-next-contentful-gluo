import { Grid } from "@/app/components/layout/PostsGrid";
import { Sidebar } from "@/app/components";
import { einaLight } from "@/app/config/fonts";
import { fetchBlogPosts } from "@/contentful/lib/blogPosts";
import { draftMode } from "next/headers";

export default async function Home() {
  const blogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled });
  return (
    <main className="container mx-auto mb-10">
      {/* Blog homepage */}
      {/* Blog homepage heading */}
      <h1 className={`text-5xl mb-10 mt-20 eina-light ${einaLight.className}`}>
        Blog
      </h1>
      <div className="p-4 flex flex-col lg:flex lg:flex-row gap-2">
        {/* Grid of articles */}
        <Grid blogPosts={blogPosts} />
        {/* Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}
