import { TypeAuthorSkeleton } from "../types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./contentfulClient";
import { ContentImage, parseContentfulContentImage } from "./contentImage";

type AuthorEntry = Entry<TypeAuthorSkeleton, undefined, string>;

// AuthorProfile interface
export interface AuthorProfile {
  authorId?: string;
  photo?: ContentImage | null;
  fullName?: string;
  slug?: string;
  biography?: RichTextDocument | null;
}

// A function to transform a Contentful author profile
// into our own AuthorProfile object.
export function parseContentfulAuthorProfile(
  author: AuthorEntry
): AuthorProfile | null {
  if (!author) {
    return null;
  }
  return {
    authorId: author.sys.id,
    photo: parseContentfulContentImage(author.fields.photo),
    fullName: author.fields.fullName,
    slug: author.fields.slug,
    biography: author.fields.biography ?? null,
  };
}

// A function to fetch all author profiles.
export async function fetchAuthorProfiles(): Promise<AuthorProfile[]> {
  const contentful = contentfulClient({});

  const authorProfilesResult = await contentful.getEntries<TypeAuthorSkeleton>({
    content_type: "author",
    include: 2,
    order: ["fields.fullName"],
  });

  return authorProfilesResult.items.map(
    (author) => parseContentfulAuthorProfile(author) ?? {}
  );
}

// A function to fetch a single author profile by slug.
interface FetchAuthorProfileOptions {
  slug: string;
}
export async function fetchAuthorProfile({
  slug,
}: FetchAuthorProfileOptions): Promise<AuthorProfile | null> {
  const contentful = contentfulClient({});

  const authorProfilesResult = await contentful.getEntries<TypeAuthorSkeleton>({
    content_type: "author",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulAuthorProfile(authorProfilesResult.items[0]);
}

// A function that returns authors by id
export async function fetchAuthorProfileById(
  id: string
): Promise<AuthorProfile> {
  const contentful = contentfulClient({});

  const authorProfilesResult = await contentful.getEntry<TypeAuthorSkeleton>(
    id,
    {
      include: 2,
    }
  );

  return parseContentfulAuthorProfile(authorProfilesResult) ?? {};
}
