import { siteConfig } from "@/app/config";
import { Grid, Sidebar, Pagination } from "@/app/components";
import { einaLight } from "@/app/config/fonts";
import { fetchBlogPosts, fetchBlogPostsPagination } from "@/contentful/lib";
import { draftMode } from "next/headers";

interface Params {
  page?: number;
}

interface Props {
  searchParams: Params;
}

export default async function Home({ searchParams }: Readonly<Props>) {
  // Get the page number from the URL query parameters
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;
  // Fetch all blog posts
  const allBlogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled });
  // Calculate the total number of pages
  const totalPages = Math.ceil(
    allBlogPosts.length / siteConfig.postsGrid.postsPerPage
  );
  // Fetch blog posts for the current page
  const blogPosts = await fetchBlogPostsPagination({
    preview: draftMode().isEnabled,
    limit: siteConfig.postsGrid.postsPerPage,
    skip: (currentPage - 1) * siteConfig.postsGrid.postsPerPage,
  });

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
      <Pagination totalPages={totalPages} />
    </main>
  );
}
