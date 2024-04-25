import {
  NodeRenderer,
  Options,
  RenderMark,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import ContentfulImage from "../ui/ContentfulImage";
import React, { ReactNode } from "react";
import Link from "next/link";
import siteConfig from "../../../../config/site.config";

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
      return <h1>{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => {
      return <h2>{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node: any, children: ReactNode) => {
      return <h3>{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node: any, children: ReactNode) => {
      return <h4>{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (node: any, children: ReactNode) => {
      return <h5>{children}</h5>;
    },
    [BLOCKS.HEADING_6]: (node: any, children: ReactNode) => {
      return <h6>{children}</h6>;
    },
    [BLOCKS.UL_LIST]: (node: any, children: ReactNode) => {
      return <ul className="list-disc list-inside">{children}</ul>;
    },
    [BLOCKS.OL_LIST]: (node: any, children: ReactNode) => {
      return (
        <ol className="list-decimal list-inside inline-block">{children}</ol>
      );
    },
    [BLOCKS.LIST_ITEM]: (node: any, children: ReactNode) => {
      return (
        <li className="text-gray-700 mb-2">
          {React.Children.map(children, (child) => {
            // If child is a string (text node), wrap it in a span
            if (React.isValidElement(child)) {
              return (
                <span className="whitespace-normal">
                  {child.props.children}
                </span>
              );
            }
            return child;
          })}
        </li>
      );
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
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
            <code className="text-sm font-mono">{children}</code>
          </pre>
        );
      }
      return <p className="text-gray-800 mb-4">{children}</p>;
    },

    [INLINES.ENTRY_HYPERLINK]: (node: any) => {
      if (node.data.target.sys.contentType.sys.id === "post") {
        return (
          <Link
            href={`/${node.data.target.fields.slug}`}
            className="text-blue-500"
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
          className="text-blue-500"
        >
          {text}
        </a>
      );
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
        return (
          <div
            className="container relative"
            style={{
              paddingBottom: "56.25%",
              paddingTop: "30px",
              height: "0",
              overflow: "hidden",
              maxWidth: "100%",
            }}
          >
            <iframe
              className="video absolute top-0 left-0 w-full h-full"
              src={node.data.target.fields.embedUrl}
              title={node.data.target.fields.title}
              allowFullScreen
            ></iframe>
          </div>
        );
      }
      return null; // Return null for no output
    },

    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      return (
        <>
          <ContentfulImage
            src={node.data.target.fields.file.url}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.title}
            className="w-full mb-4 mt-8"
          />
          {/* caption */}
          <p className="text-sm text-gray-600">
            {node.data.target.fields.description}
          </p>
        </>
      );
    },
  },
};

export const RichText = ({ document, excerpt }: any) => {
  return (
    <div className="p-6">
      {siteConfig.post.showExcerptAsQuote && excerpt && (
        <blockquote>{excerpt}</blockquote>
      )}
      {documentToReactComponents(document, options)}
    </div>
  );
};
