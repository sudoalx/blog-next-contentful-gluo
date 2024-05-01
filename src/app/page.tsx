import { siteConfig } from "@/app/config";
import { Grid, Sidebar } from "@/app/components";
import { einaLight } from "@/app/config/fonts";
import { fetchBlogPosts } from "@/contentful/lib";
import { draftMode } from "next/headers";

export async function generateStaticParams() {
  const categories = await fetchBlogPosts({ preview: false });

  return categories;
}

export default async function Home() {
  const blogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled });

  return (
    // Blog homepage
    <main className="container mx-auto mb-10">
      {/* Blog homepage heading */}
      <h1
        className={`text-5xl mb-10 mt-20 mx-4 eina-light ${einaLight.className} font-light`}
      >
        Blog
      </h1>
      {/* Blog homepage content */}
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
        <Sidebar />
      </div>
    </main>
  );
}
