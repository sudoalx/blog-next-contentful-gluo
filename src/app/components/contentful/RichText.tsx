import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export const RichText = ({ document }: any) => {
  return <div>{documentToReactComponents(document)}</div>;
};
