import { BlogPost } from "@/contentful/lib/";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import Link from "next/link";
import slugify from "slugify";
import { Accordion } from "./Accordion";

// This is for cases where the heading might be partially underlined and have two child nodes
// so you can't just get the text (.value) from the first one in the array
export const getPlainTextFromHeader = (contentNode: any) => {
  return contentNode.reduce((acc: any, current: any) => {
    return acc + current.value;
  }, "");
};

export const getHeadersFromRichText = (richText: Document) => {
  // Extract all headers of level 2
  const headers = (content: any) => content.nodeType === BLOCKS.HEADING_2;

  // Rerun the inner text and slugify the header returning a reference link
  return richText.content.filter(headers).map((heading: any) => {
    const plainText = getPlainTextFromHeader(heading.content);

    return {
      text: plainText,
      href: `#${slugify(plainText)}`,
    };
  });
};

// Results in something like:
// [{ text: 'Heading one', slug: 'heading-one' }]

interface TableOfContentsProps {
  post: BlogPost;
}

export const TableOfContents = ({ post }: TableOfContentsProps) => {
  const pstHeaders = getHeadersFromRichText(post.body!);

  return (
    <Accordion>
      {/* Iterate over the headers (h2) in the post */}
      {pstHeaders.map(({ text, href }, i: number) => (
        <li
          key={`${i}-${text}`}
          className="py-4 border-b-[1px] border-solid border-[#dddddd] flex flex-wrap text-wrap"
        >
          {/* Use the Link component directly */}
          <Link href={href}>{text}</Link>
        </li>
      ))}
    </Accordion>
  );
};
