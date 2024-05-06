import { TypeFooterSkeleton } from "../types";
import contentfulClient from "./contentfulClient";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

export interface Footer {
  name: string;
  firstColTitle: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  secondColTitle: string;
  locations: RichTextDocument;
  phoneNumber: string;
  madeWithLove: string;
}

// A function to fetch Footer
export async function fetchFooter(): Promise<Footer> {
  const contentful = contentfulClient({});

  const footerResults = await contentful.getEntries<TypeFooterSkeleton>({
    content_type: "footer",
    include: 10,
    "fields.footerName": "Main Footer",
  }); // Fetch the footer

  if (!footerResults.items.length) {
    return {} as Footer;
  }

  const footer = footerResults.items[0].fields;
  return {
    name: footer.footerName,
    firstColTitle: footer.firstColumnTitle,
    instagram: footer.instagramLink,
    linkedin: footer.linkedInLink,
    youtube: footer.youTubeLink,
    secondColTitle: footer.titleSecondColumn,
    locations: footer.locations,
    phoneNumber: footer.phoneNumber,
    madeWithLove: footer.madeIn,
  };
}
