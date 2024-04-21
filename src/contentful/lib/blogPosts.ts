import { TypePostSkeleton } from "../types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./contentfulClient";
import { ContentImage, parseContentfulContentImage } from "./contentImage";

type BlogPostEntry = Entry<TypePostSkeleton, undefined, string>;

// Our simplified version of a BlogPost.
// We don't need all the data that Contentful gives us.

export interface BlogPost {
  title: string;
  slug: string;
  thumbnail: ContentImage | null;
  featuredImage: ContentImage | null;
  metaDescription: string | null;
  metaKeywords: string[] | null;
  creationDate: Date | null;
  excerpt: string | null;
  body: RichTextDocument | null;
  authorId?: string;
  category?: any;
}

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulBlogPost(
  blogPostEntry?: BlogPostEntry
): BlogPost | null {
  if (!blogPostEntry) {
    return null;
  }
  // const { fields: author } = blogPostEntry.fields.author as { fields: any };

  return {
    authorId: blogPostEntry.fields.author.sys.id,
    title: blogPostEntry.fields.title,
    slug: blogPostEntry.fields.slug,
    thumbnail: parseContentfulContentImage(blogPostEntry.fields.thumbnail),
    featuredImage: parseContentfulContentImage(
      blogPostEntry.fields.featuredImage
    ),
    metaDescription: blogPostEntry.fields.metaDescription ?? null,
    metaKeywords: blogPostEntry.fields.metaKeywords ?? null,
    creationDate: blogPostEntry.fields.creationDate
      ? new Date(blogPostEntry.fields.creationDate)
      : null,
    excerpt: blogPostEntry.fields.excerpt ?? null,
    body: blogPostEntry.fields.body ?? null,
    category: blogPostEntry.fields.category,
  };
}

// A function to fetch all blog posts.
// Optionally uses the Contentful content preview.
interface FetchBlogPostsOptions {
  preview: boolean;
}
export async function fetchBlogPosts({
  preview,
}: FetchBlogPostsOptions): Promise<BlogPost[]> {
  const contentful = contentfulClient({ preview });

  const blogPostsResult = await contentful.getEntries<TypePostSkeleton>({
    content_type: "post",
    include: 5,
    order: ["-fields.creationDate"],
  });

  // Map blog post entries to BlogPost objects including author information
  return blogPostsResult.items.map((blogPostEntry) => {
    // const { fields: author } = blogPostEntry.fields.author as { fields: any };
    return {
      title: blogPostEntry.fields.title || "",
      slug: blogPostEntry.fields.slug || "",
      thumbnail: parseContentfulContentImage(blogPostEntry.fields.thumbnail),
      featuredImage: parseContentfulContentImage(
        blogPostEntry.fields.featuredImage
      ),
      metaDescription: blogPostEntry.fields.metaDescription ?? null,
      metaKeywords: blogPostEntry.fields.metaKeywords ?? null,
      creationDate: blogPostEntry.fields.creationDate
        ? new Date(blogPostEntry.fields.creationDate)
        : null,
      excerpt: blogPostEntry.fields.excerpt ?? null,
      body: blogPostEntry.fields.body ?? null,
      authorId: blogPostEntry.fields.author.sys.id,
      category: blogPostEntry.fields.category,
    };
  });
}

// A function to fetch blogposts by authorId
const fetchBlogPostsByAuthor = () => {};

// A function to fetch blogposts by category

// A function to fetch a single blog post by its slug.
// Optionally uses the Contentful content preview.
interface FetchBlogPostOptions {
  slug: string;
  preview: boolean;
}
export async function fetchBlogPost({
  slug,
  preview,
}: FetchBlogPostOptions): Promise<BlogPost | null> {
  const contentful = contentfulClient({ preview });

  const blogPostsResult = await contentful.getEntries<TypePostSkeleton>({
    content_type: "post",
    "fields.slug": slug,
    include: 5,
  });

  return parseContentfulBlogPost(blogPostsResult.items[0]);
}
