import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import ContentfulImage from "../ui/ContentfulImage";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  AwaitedReactNode,
  ReactPortal,
} from "react";
import Link from "next/link";

const options = {
  renderMark: {
    [MARKS.CODE]: (
      text:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<AwaitedReactNode>
        | null
        | undefined
    ) => {
      return (
        <pre>
          <code>{text}</code>
        </pre>
      );
    },
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (
      node: { content: any[] },
      children:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | Promise<AwaitedReactNode>
        | null
        | undefined
    ) => {
      if (
        node.content.find((item) =>
          item.marks?.find((mark: { type: string }) => mark.type === "code")
        )
      ) {
        return (
          <div>
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        );
      }

      return <p>{children}</p>;
    },

    [INLINES.ENTRY_HYPERLINK]: (node: {
      data: {
        target: {
          sys: { contentType: { sys: { id: string } } };
          fields: { slug: any; title: any };
        };
      };
    }) => {
      if (node.data.target.sys.contentType.sys.id === "post") {
        return (
          <Link href={`/posts/${node.data.target.fields.slug}`}>
            {node.data.target.fields.title}
          </Link>
        );
      }
    },

    [INLINES.HYPERLINK]: (node: {
      content: any[];
      data: { uri: string | undefined };
    }) => {
      const text = node.content.find((item) => item.nodeType === "text")?.value;
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node: {
      data: {
        target: {
          sys: { contentType: { sys: { id: string } } };
          fields: { embedUrl: string | undefined; title: string | undefined };
        };
      };
    }) => {
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
    },

    [BLOCKS.EMBEDDED_ASSET]: (node: {
      data: {
        target: {
          fields: {
            file: {
              url: string;
              details: { image: { height: number; width: number } };
            };
            title: string;
          };
        };
      };
    }) => {
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
