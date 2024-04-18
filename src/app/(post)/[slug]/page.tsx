import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  fetchBlogPost,
  fetchBlogPosts,
} from "../../../contentful/lib/blogPosts";
import Image from "next/image";
import { ShareButtons } from "../../components/metadata/ShareButtons";
import { TagPills } from "../../components/tags/TagPills";
import { PostInfo } from "../../components/metadata/PostInfo";
import ContentfulImage from "@/app/components/ui/ContentfulImage";
import { RichText } from "@/app/components/contentful/RichText";
import { RelatedPosts } from "@/app/components/post/RelatedPosts";
import { PostHeader } from "@/app/components/post/PostHeader";

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
      <article className="container-article mb-9">
        {/* Post Header */}
        <PostHeader blogPost={blogPost} />

        {/* Post body */}
        <div className="text-lg mt-9">
          <RichText document={blogPost.body} excerpt={blogPost.excerpt} />
        </div>
      </article>

      {/* Related Post section */}
      <RelatedPosts />
    </>
  );
}
