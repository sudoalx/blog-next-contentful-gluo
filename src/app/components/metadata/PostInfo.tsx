import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { fetchAuthorProfileById } from "@/contentful/authorProfile";
import { readingTimeEstimator } from "@/lib/utils/reading-time";

interface PostInfoProps {
  creationDate: Date;
  authorId: string;
  body: RichTextDocument;
}

export const PostInfo = async ({
  creationDate,
  authorId,
  body,
}: PostInfoProps) => {
  const author = await fetchAuthorProfileById(authorId);
  const readingTime = await readingTimeEstimator(body);
  return (
    <div className="flex flex-wrap gap-2 sm:gap-10 mt-4 text-xs text-gray-500">
      <p className="text-xs text-gray-500">
        {creationDate?.toLocaleDateString("en-GB")}
      </p>
      <p className="text-xs text-gray-500">Author: {author.fullName}</p>
      <p className="text-xs text-gray-500">{`${readingTime}`}</p>
    </div>
  );
};
