import Link from "next/link";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { readingTimeEstimator } from "@/lib/utils/reading-time";
import { fetchAuthorProfileById } from "@/contentful/lib/authorProfile";
import ContentfulImage from "../ui/ContentfulImage";

interface CardProps {
  title: string;
  date: string;
  body: RichTextDocument;
  slug: string;
  image: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
  authorId: string;
  excerpt?: any;
}

export const Card = async ({
  title,
  date,
  body,
  slug,
  authorId,
  image = {
    src: "https://via.placeholder.com/850x500",
    alt: "Placeholder image",
    height: 500,
    width: 850,
  },
  excerpt,
}: CardProps) => {
  const readingTime = await readingTimeEstimator(body);
  const author = await fetchAuthorProfileById(authorId);

  return (
    <article className="p-4 border border-gray-200 ">
      <Link href={slug}>
        <ContentfulImage
          src={image.src}
          alt={image.alt}
          height={image.height}
          width={image.width}
          // set height and width to maintain aspect ratio
          className="rounded-lg mb-4 w-full h-40 object-cover"
        />
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2 text-sm">{excerpt}</p>
      </Link>

      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-500">{author?.fullName}</p>
        <p className="text-sm text-gray-500">{`${readingTime}`}</p>
      </div>
    </article>
  );
};
