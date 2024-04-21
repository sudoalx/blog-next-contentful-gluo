import { Sidebar } from "@/app/components";
import { Grid } from "@/app/components/layout/PostsGrid";
import { einaLight } from "@/app/config/fonts";
import { fetchBlogPosts } from "@/contentful/lib/blogPosts";
import { draftMode } from "next/headers";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";

interface CategoriesPageProps {
  params: {
    category: string;
  };
}

export default async function CategoriesPage({
  params,
}: Readonly<CategoriesPageProps>) {
  const { category } = params;
  const blogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled });
  return (
    <main className="container mx-auto mb-10">
      {/* Blog category page */}
      {/* Blog category title */}
      <div
        className={`${einaLight.className} flex flex-wrap items-end gap-4 my-10 px-4 text-4xl`}
      >
        <Link
          href="/"
          className=" hover:text-blue-600"
          aria-label="Back to blog"
        >
          Blog
        </Link>
        <SlArrowRight className="inline text-3xl  " />
        <span className="capitalize">{decodeURI(category)}</span>
      </div>
      <div className="p-4 flex flex-col-reverse lg:flex lg:flex-row gap-2">
        {/* Grid of articles */}
        <Grid blogPosts={blogPosts} />
        {/* Sidebar */}
        <Sidebar params={params} />
      </div>
    </main>
  );
}
