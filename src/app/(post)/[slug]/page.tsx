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
      {/* Post header */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Top left section */}
        <div>
          {/* The blog post title */}
          <h1 className="text-4xl font-bold">{blogPost.title}</h1>
          {/* The blog post info */}
          <PostInfo
            authorId={blogPost.authorId!}
            creationDate={blogPost.creationDate!}
            body={blogPost.body!}
          />
          <div>
            {/* The tags for the blog post */}
            <TagPills />
          </div>
          {/* The share buttons */}
          <ShareButtons title={blogPost.title} />
        </div>
        {/* Top right section */}
        <div className="flex justify-end">
          <div>
            {blogPost.featuredImage && (
              <ContentfulImage {...blogPost.featuredImage} />
            )}
          </div>
        </div>
      </div>

      {/* Post body */}
      <div className="text-lg mt-36">
        <RichText document={blogPost.body} />
      </div>

      {/* Related posts */}
      <div>
        <h3 className="text-2xl font-semibold mt-8 mb-4 border-b border-gray-200 pb-4">
          Related
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <Image
              width={850}
              height={500}
              alt="Placeholder image"
              src={"https://via.placeholder.com/850x500"}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-xl font-semibold">Blog Post 1</h2>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <p className="text-xs text-gray-500">2021-09-01</p>
              <p className="text-xs text-gray-500">Author</p>
              <p className="text-xs text-gray-500">5 min read</p>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <Image
              width={850}
              height={500}
              alt="Placeholder image"
              src={"https://via.placeholder.com/850x500"}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-xl font-semibold">Blog Post 2</h2>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <p className="text-xs text-gray-500">2021-09-01</p>
              <p className="text-xs text-gray-500">Author</p>
              <p className="text-xs text-gray-500">5 min read</p>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <Image
              width={850}
              height={500}
              alt="Placeholder image"
              src={"https://via.placeholder.com/850x500"}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-xl font-semibold">Blog Post 3</h2>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <p className="text-xs text-gray-500">2021-09-01</p>
              <p className="text-xs text-gray-500">Author</p>
              <p className="text-xs text-gray-500">5 min read</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
