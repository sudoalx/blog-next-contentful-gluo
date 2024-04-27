import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { fetchBlogPost, fetchBlogPosts } from "@/contentful/lib/blogPosts";
import {
  RelatedPosts,
  PostHeader,
  DisqusComments,
  RichText,
  TableOfContents,
  ScrollUpButton,
} from "@/app/components";
import Link from "next/link";
import { asm } from "@/app/config/fonts";
import { siteConfig } from "@/app/config";

interface BlogPostPageParams {
  slug: string;
}

interface BlogPostPageProps {
  params: BlogPostPageParams;
}

// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
  const blogPosts = await fetchBlogPosts({ preview: false });

  return blogPosts.map((post) => ({ slug: post.slug }));
}

// For each blog post, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!params.slug) {
    return redirect("/");
  }

  const blogPost = await fetchBlogPost({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!blogPost) {
    return notFound();
  }

  return {
    title: blogPost.title,
    description: blogPost.metaDescription,
    keywords: blogPost.metaKeywords,
    openGraph: {
      title: blogPost.title,
      description: blogPost.metaDescription ?? "",
      type: "article",
      images: [
        {
          url: blogPost.featuredImage?.src!,
          alt: blogPost.featuredImage?.alt,
        },
      ],
    },
  };
}

export default async function BlogPage({
  params,
}: Readonly<BlogPostPageProps>) {
  // Fetch a single blog post by slug,
  // using the content preview if draft mode is enabled:
  const blogPost = await fetchBlogPost({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!blogPost) {
    // If a blog post can't be found,
    // tell Next.js to render a 404 page.
    return notFound();
  }

  return (
    <>
      <div className={`${asm.className} my-10`}>
        <Link href="/" className="text-base mx-4" aria-label="Back to blog">
          Blog
        </Link>
        {"/"}
        <Link
          href={`/category/${blogPost.category.fields.category.toLowerCase()}`}
          className="text-base mx-4 capitalize"
          aria-label="View all posts in this category"
        >
          {blogPost.category.fields.category}
        </Link>
      </div>
      <article className="container-article mb-9">
        {/* Post Header */}
        <PostHeader blogPost={blogPost} />

        <div
          className={`text-lg mt-9 flex flex-wrap flex-col-reverse justify-between md:flex-row${
            siteConfig.post.positionTableOfContents == "right" ? "" : "-reverse"
          } `}
        >
          {/* Post body */}
          <div className="w-full md:w-5/8 lg:w-3/4 mx-auto">
            <RichText document={blogPost.body} excerpt={blogPost.excerpt} />
          </div>
          {/* Scroll to top button */}
          <div className="w-12">
            <ScrollUpButton />
          </div>

          {/* Table of contents */}
          <div className="md:w-2/8 lg:w-2/8 mx-auto md:sticky md:top-10 md:h-full">
            <TableOfContents post={blogPost} />
          </div>
        </div>
      </article>
      {/* Disqus comments section */}
      <DisqusComments post={blogPost} />
      {/* Related Post section */}
      <RelatedPosts
        categoryId={blogPost.category.sys.id}
        currentPostId={blogPost.blogPostId!}
      />
    </>
  );
}
