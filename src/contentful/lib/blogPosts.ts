import { TypePostSkeleton } from "../types";
import { Asset, AssetLink, Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./contentfulClient";
import { ContentImage, parseContentfulContentImage } from "./contentImage";

type BlogPostEntry = Entry<TypePostSkeleton, undefined, string>;

// Our simplified version of a BlogPost.
// We don't need all the data that Contentful gives us.

export interface BlogPost {
  blogPostId?: string;
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
    blogPostId: blogPostEntry.sys.id,
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
    authorId: blogPostEntry.fields.author.sys.id,
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
export const fetchBlogPostsByCategory = async (
  categoryId: string | null
): Promise<BlogPost[]> => {
  // If no categoryId is provided, return an empty array
  if (!categoryId) {
    return [];
  }

  const contentful = contentfulClient({ preview: false });
  const blogPostsResult = contentful.getEntries<TypePostSkeleton>({
    content_type: "post",
    "fields.category.sys.id": categoryId,
    include: 5,
  });
  return (await blogPostsResult).items.map(
    (blogPostEntry: {
      fields: {
        title: any;
        slug: any;
        thumbnail: Asset<undefined, string> | { sys: AssetLink } | undefined;
        featuredImage:
          | Asset<undefined, string>
          | { sys: AssetLink }
          | undefined;
        metaDescription: any;
        metaKeywords: any;
        creationDate: string | number | Date;
        excerpt: any;
        body: any;
        author: { sys: { id: any } };
        category: any;
      };
    }) => {
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
    }
  );
};

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

export const fetchRelatedBlogPostsByCategory = async (
  categoryId: string | null,
  currentBlogPostId: string | null
): Promise<any> => {
  // If no categoryId is provided, return an empty array
  if (!categoryId) {
    return [];
  }

  const contentful = contentfulClient({ preview: false });
  const blogPostsResult = await contentful.getEntries<TypePostSkeleton>({
    content_type: "post",
    "fields.category.sys.id": categoryId,
    include: 5,
    limit: 3,
  });

  let blogPosts = blogPostsResult.items;

  // Filter out the current blog post if its ID is provided
  if (currentBlogPostId) {
    blogPosts = blogPosts.filter(
      (blogPost) => blogPost.sys.id !== currentBlogPostId
    );
  }

  return blogPosts.map((blogPostEntry: BlogPostEntry) => {
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
};
