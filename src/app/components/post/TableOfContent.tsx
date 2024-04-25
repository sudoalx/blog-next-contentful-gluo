import { BlogPost } from "@/contentful/lib/blogPosts";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import Link from "next/link";
import { BiArrowToRight } from "react-icons/bi";
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
    <div className="font-extralight text-base">
      <div className="flex items-center">
        <span>
          <FaCaretRight className="inline-block text-[#d2fc51] text-2xl -ml-3" />
        </span>
        <h4 className="m-0">Content</h4>
      </div>
      <ol>
        {/* Iterate over the headers (h2) in the post */}
        {getHeadersFromRichText(post.body!).map(({ text, href }, i: number) => (
          <li
            key={i}
            className="py-4 border-b-[1px] border-solid border-[#dddddd]"
          >
            {/* Create a link to each header */}
            <Link href={href}>{text}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
