import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { fetchAuthorProfileById } from "@/contentful/lib/authorProfile";
import { readingTimeEstimator } from "@/lib/utils/reading-time";
import Link from "next/link";
import ContentfulImage from "../ui/ContentfulImage";
import { siteConfig } from "@/app/config";

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
    <div className="flex flex-wrap gap-4 sm:gap-10 mt-4 text-xs text-gray-500 items-center">
      <p className="text-xs text-gray-500">
        <time dateTime={creationDate?.toISOString()}>
          {creationDate?.toLocaleDateString("en-GB")}
        </time>
      </p>
      <div className="flex items-center text-xs text-gray-500">
        <Link
          href={`/author/${author.slug}`}
          className="flex items-center text-xs text-gray-500"
        >
          {siteConfig.author.showProfilePicture && (
            <ContentfulImage
              {...author.photo!}
              className="rounded-full h-6 w-6 mr-2"
            />
          )}
          {author.fullName}
        </Link>
      </div>
      <p className="text-xs text-gray-500">{`${readingTime}`}</p>
    </div>
  );
};
