import { RichText, Grid } from "@/app/components";
import {
  fetchAuthorProfile,
  fetchAuthorProfiles,
} from "@/contentful/lib/authorProfile";
import { fetchBlogPostsByAuthor } from "@/contentful/lib/blogPosts";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface AuthorPageParams {
  slug: string;
}

interface AuthorPageProps {
  params: AuthorPageParams;
}

// Tell Next.js about all authors
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<AuthorPageParams[]> {
  const authors = await fetchAuthorProfiles();

  return authors.map((author) => ({ slug: author.slug! }));
}

// For each author, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata(
  { params }: AuthorPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const author = await fetchAuthorProfile({
    slug: params.slug,
  });

  if (!author) {
    return notFound();
  }

  return {
    title: author.fullName, // Use fullName as title
    description: documentToPlainTextString(author.biography!), // Use biography as description
  };
}

export default async function AuthorPage({
  params,
}: Readonly<AuthorPageProps>) {
  const author = await fetchAuthorProfile({
    slug: params.slug,
  });

  if (!author) {
    // Handle case where author is not found
    // For example, redirect to 404 page
    return notFound();
  }
  const authorPosts = await fetchBlogPostsByAuthor(author.authorId!);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Display profile picture & full name */}
      <div className="flex items-center space-x-4 flex-col">
        <Image
          {...author.photo!} // Spread the properties of author.photo directly into the Image component
          src={`https:${author.photo?.src}`} // Assuming `src` is a string representing the image URL
          className="rounded-full w-36 h-36"
        />
        <h1 className="border-b-4 border-[#d2fc51] text-3xl font-bold text-center">
          {author.fullName}
        </h1>
      </div>
      {/* Profile bio */}
      <div className="mt-4 text-lg text-gray-700">
        <h2 className="px-6">
          <span className="text-2xl font-bold">Biography</span>
        </h2>
        <RichText document={author.biography} />
      </div>
      {/* Display blog posts by author */}
      <div>
        <h2 className="font-bold mt-8 pb-2 mb-4 border-b-4 border-[#d2fc51]">
          Blog Posts by {author.fullName}
        </h2>
        <Grid blogPosts={authorPosts} />
      </div>
    </div>
  );
}
