import {
  NodeRenderer,
  Options,
  RenderMark,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import ContentfulImage from "../ui/ContentfulImage";
import { ReactNode } from "react";
import Link from "next/link";

// Define custom options type
type CustomOptions = Omit<Options, "renderMark" | "renderNode"> & {
  renderMark: RenderMark;
  renderNode: Record<string, NodeRenderer>;
};

const options: CustomOptions = {
  renderMark: {
    [MARKS.CODE]: (code: ReactNode) => {
      return (
        <pre>
          <code>{code}</code>
        </pre>
      );
    },
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: ReactNode) => {
      return (
        <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-8">
          {children}
        </h1>
      );
    },
    [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => {
      return (
        <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: any, children: ReactNode) => {
      return (
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
          {children}
        </h3>
      );
    },
    [BLOCKS.HEADING_4]: (node: any, children: ReactNode) => {
      return (
        <h4 className="text-xl font-bold text-gray-900 mb-4 mt-8">
          {children}
        </h4>
      );
    },
    [BLOCKS.HEADING_5]: (node: any, children: ReactNode) => {
      return (
        <h5 className="text-lg font-bold text-gray-900 mb-4 mt-8">
          {children}
        </h5>
      );
    },
    [BLOCKS.HEADING_6]: (node: any, children: ReactNode) => {
      return (
        <h6 className="text-base font-bold text-gray-900 mb-4 mt-8">
          {children}
        </h6>
      );
    },
    [BLOCKS.UL_LIST]: (node: any, children: ReactNode) => {
      return <ul className="list-disc list-inside inline-block">{children}</ul>;
    },
    [BLOCKS.OL_LIST]: (node: any, children: ReactNode) => {
      return (
        <ol className="list-decimal list-inside inline-block">{children}</ol>
      );
    },
    [BLOCKS.LIST_ITEM]: (node: any, children: ReactNode) => {
      return <li className="text-gray-700 mb-2">{children}</li>;
    },
    [BLOCKS.QUOTE]: (node: any, children: ReactNode) => {
      return <blockquote>{children}</blockquote>;
    },
    [BLOCKS.HR]: () => {
      return <hr className="border-t border-gray-300 my-8" />;
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => {
      if (
        node.content.find((item: any) =>
          item.marks?.find((mark: any) => mark.type === "code")
        )
      ) {
        return (
          <div>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
              <code className="text-sm font-mono">{children}</code>
            </pre>
          </div>
        );
      }
      return <p className="text-gray-800 mb-4">{children}</p>;
    },

    [INLINES.ENTRY_HYPERLINK]: (node: any) => {
      if (node.data.target.sys.contentType.sys.id === "post") {
        return (
          <Link
            href={`/posts/${node.data.target.fields.slug}`}
            className="text-blue-500 hover:underline"
          >
            {node.data.target.fields.title}
          </Link>
        );
      }
      return null; // Return null for no output
    },

    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => {
      const text = node.content.find(
        (item: any) => item.nodeType === "text"
      )?.value;
      return (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {text}
        </a>
      );
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
        return (
          <iframe
            height="400"
            width="100%"
            src={node.data.target.fields.embedUrl}
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
      return null; // Return null for no output
    },

    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      return (
        <ContentfulImage
          src={node.data.target.fields.file.url}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.title}
          className="w-full"
        />
      );
    },
  },
};

export const RichText = ({ document }: any) => {
  return <div>{documentToReactComponents(document, options)}</div>;
};
