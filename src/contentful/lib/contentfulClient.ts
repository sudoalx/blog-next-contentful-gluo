import { createClient } from "contentful";

const {
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
} = process.env;

if (
  !NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
  !NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
  !NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
) {
  throw new Error("Contentful environment variables are not set");
}

// This is the standard Contentful client. It fetches
// content that has been published.
const client = createClient({
  space: NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// This is a Contentful client that's been configured
// to fetch drafts and unpublished content.
const previewClient = createClient({
  space: NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

// This little helper will let us switch between the two
// clients easily:
export default function contentfulClient({ preview = false }) {
  if (preview) {
    return previewClient;
  }

  return client;
}
