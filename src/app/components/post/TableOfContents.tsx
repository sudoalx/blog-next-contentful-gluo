import { BlogPost } from "@/contentful/lib/";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import Link from "next/link";
import { FaCaretRight } from "react-icons/fa6";
import slugify from "slugify";

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
  return (
    <div className="font-extralight text-base p-2">
      <div className="flex gap-2 items-center">
        <span>
          <FaCaretRight className="inline-block text-[#d2fc51] text-2xl -ml-2" />
        </span>
        <h4 className="m-0 font-light text-lg">Content</h4>
      </div>
      {/* For displays smaller than md then make collapsable <ol> */}
      <ol className="flex flex-col lg:block list-none pl-0 mt-4 mb-0">
        {/* Iterate over the headers (h2) in the post */}
        {getHeadersFromRichText(post.body!).map(({ text, href }, i: number) => (
          <li
            key={`${i}-${text}`}
            className="py-4 border-b-[1px] border-solid border-[#dddddd] flex flex-wrap text-wrap"
          >
            {/* Create a link to each header */}
            <Link href={href}>{text}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
