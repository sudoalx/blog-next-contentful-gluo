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
    include: 3,
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
export const fetchBlogPostsByAuthor = async (
  authorId: string
): Promise<BlogPost[]> => {
  const contentful = contentfulClient({ preview: false });
  const blogPostsResult = contentful.getEntries<TypePostSkeleton>({
    content_type: "post",
    "fields.author.sys.id": authorId,
    include: 3,
  });
  // Map blog post entries to BlogPost objects including author information
  return (await blogPostsResult).items.map((blogPostEntry) => {
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
};

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
    include: 3,
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
    include: 3,
  });

  return parseContentfulBlogPost(blogPostsResult.items[0]);
}

export const fetchRelatedBlogPostsByCategory = async (
  categoryId: string,
  currentBlogPostId: string
): Promise<any> => {
  const contentful = contentfulClient({ preview: false });

  const blogPostsResult = await contentful.getEntries<TypePostSkeleton>({
    content_type: "post",
    // Exclude the current blog post (https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/inequality-operator)
    "sys.id[ne]": currentBlogPostId,
    // Filter by category ID
    "fields.category.sys.id": categoryId,
    include: 3,
    limit: 3,
  });

  return blogPostsResult.items.map((blogPostEntry: BlogPostEntry) => {
    return {
      title: blogPostEntry.fields.title,
      slug: blogPostEntry.fields.slug,
      thumbnail: parseContentfulContentImage(blogPostEntry.fields.thumbnail),
      featuredImage: parseContentfulContentImage(
        blogPostEntry.fields.featuredImage
      ),
      metaDescription: blogPostEntry.fields.metaDescription,
      metaKeywords: blogPostEntry.fields.metaKeywords,
      creationDate: blogPostEntry.fields.creationDate
        ? new Date(blogPostEntry.fields.creationDate)
        : null,
      excerpt: blogPostEntry.fields.excerpt,
      body: blogPostEntry.fields.body,
      authorId: blogPostEntry.fields.author.sys.id,
      category: blogPostEntry.fields.category,
    };
  });
};

// A function to fetch blog posts for pagination.
// Optionally uses the Contentful content preview.
interface FetchBlogPostsPaginationOptions {
  limit: number;
  skip: number;
  preview: boolean;
}
export async function fetchBlogPostsPagination({
  limit,
  skip,
  preview,
}: FetchBlogPostsPaginationOptions): Promise<BlogPost[]> {
  const contentful = contentfulClient({ preview });

  const blogPostsResult = await contentful.getEntries<TypePostSkeleton>({
    content_type: "post",
    include: 3,
    order: ["-fields.creationDate"],
    limit,
    skip,
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
