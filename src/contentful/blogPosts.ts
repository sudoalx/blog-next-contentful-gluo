import { TypeAuthorSkeleton, TypePostSkeleton } from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./contentfulClient";
import { ContentImage, parseContentfulContentImage } from "./contentImage";

type BlogPostEntry = Entry<TypePostSkeleton, undefined, string>;
type AuthorEntry = Entry<TypeAuthorSkeleton, undefined, string>;

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
  readingTime: number | null;
  excerpt: RichTextDocument | null;
  body: RichTextDocument | null;
  author?: string;
}

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulBlogPost(
  blogPostEntry?: BlogPostEntry,
  author?: AuthorEntry
): BlogPost | null {
  if (!blogPostEntry) {
    return null;
  }

  return {
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
    readingTime: blogPostEntry.fields.readingTime ?? null,
    excerpt: blogPostEntry.fields.excerpt ?? null,
    body: blogPostEntry.fields.body ?? null,
    author: author?.fields.fullName,
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
    include: 2,
    order: ["fields.title"],
  });

  return blogPostsResult.items.map(
    (blogPostEntry) => parseContentfulBlogPost(blogPostEntry) as BlogPost
  );
}

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
    include: 2,
  });

  return parseContentfulBlogPost(blogPostsResult.items[0]);
}
