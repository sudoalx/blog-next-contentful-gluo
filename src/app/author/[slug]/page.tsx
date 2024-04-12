import {
  fetchAuthorProfile,
  fetchAuthorProfiles,
} from "@/contentful/authorProfile";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
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

  return (
    <div>
      <Image
        {...author.photo!} // Spread the properties of author.photo directly into the Image component
        src={`https:${author.photo?.src}`} // Assuming `src` is a string representing the image URL
      />
      <h1>{author.fullName}</h1>

      <div>{documentToReactComponents(author.biography!)}</div>
      {/* Render author details as needed */}
    </div>
  );
}
