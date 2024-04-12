import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { readingTime } from "reading-time-estimator";

export const readingTimeEstimator = async (
  text: string | RichTextDocument
): Promise<string> => {
  if (typeof text === "string") {
    return readingTime(text, 238).text;
  }
  const plainText = documentToPlainTextString(text);
  const time = readingTime(plainText, 238);
  return time.text;
};
