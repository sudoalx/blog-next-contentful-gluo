import Link from "next/link";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { readingTimeEstimator } from "@/lib/utils/reading-time";
import {
  fetchAuthorProfileById,
  ContentImage,
  AuthorProfile,
} from "@/contentful/lib/";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/app/config";
import { ContentfulImage } from "../ui";

interface CardProps {
  title: string;
  date: string;
  body: RichTextDocument;
  slug: string;
  image: ContentImage;
  authorId: string;
  excerpt: any;
}

interface CardDesignProps {
  title: string;
  date: string;
  slug: string;
  image: ContentImage;
  excerpt: string;
  author: AuthorProfile;
  readingTime: string;
}

export const Card = async ({
  title,
  date,
  body,
  slug,
  authorId,
  image,
  excerpt,
}: CardProps) => {
  const readingTime = await readingTimeEstimator(body);
  const author = await fetchAuthorProfileById(authorId);

  const cardProps: CardDesignProps = {
    title,
    date,
    slug,
    image,
    excerpt,
    author,
    readingTime,
  };

  const cardDesign: string = siteConfig.postCard.design;

  switch (cardDesign) {
    case "rounded":
      return <CardDesignRounded {...cardProps} />;
    case "rounded2":
      return <CardDesignRounded2 {...cardProps} />;
    case "squared":
      return <CardDesignSquared {...cardProps} />;
    case "squared2":
      return <CardDesignSquared2 {...cardProps} />;
    default:
      return <CardDesignSquared {...cardProps} />;
  }
};

const CardDesignRounded = ({
  title,
  date,
  slug,
  image,
  excerpt,
  author,
  readingTime,
}: CardDesignProps) => {
  return (
    <div className="p-4 border rounded-md border-gray-200">
      <Link href={`/posts/${slug}`}>
        {/* Show image */}
        <ContentfulImage
          src={image.src}
          alt={image.alt}
          height={image.height}
          width={image.width}
          className="rounded-lg mb-4 w-full object-cover h-1/2 hover:opacity-80 transition-opacity"
        />
        {/* Show title */}
        <h2 className="text-xl font-normal mt-0 mb-1 hover:text-[#0d6efd]">
          {title}
        </h2>
        {/* Show excerpt if enabled */}
        {siteConfig.postCard.showExcerpt && (
          <p className="text-gray-600 mt-2 text-sm">{excerpt}</p>
        )}
      </Link>

      <div className="flex justify-between items-center mt-4 mb-4 text-sm text-gray-500">
        <p className="text-sm text-gray-500">{formatDate(date)}</p>
        <div className="flex items-center">
          <Link href={`/author/${author.slug}`} className="flex items-center">
            {/* Show author profile picture if enabled */}
            {siteConfig.postCard.showAuthorProfilePicture && (
              <ContentfulImage
                {...author.photo!}
                className="rounded-full h-6 w-6 mr-2"
              />
            )}
            <p className="mr-2">{author?.fullName}</p>
          </Link>
        </div>
        <p className="text-sm text-gray-500">{readingTime}</p>
      </div>
    </div>
  );
};

const CardDesignRounded2 = ({
  title,
  date,
  slug,
  image,
  excerpt,
  author,
  readingTime,
}: CardDesignProps) => {
  return (
    <div className="p-4 border rounded-md border-gray-200">
      <Link href={`/posts/${slug}`}>
        {/* Show image */}
        <ContentfulImage
          src={image.src}
          alt={image.alt}
          height={image.height}
          width={image.width}
          className="rounded-lg mb-4 w-full object-cover h-1/2 hover:opacity-80 transition-opacity"
        />
        {/* Show title */}
        <h2 className="text-xl font-normal mt-0 mb-1 hover:text-[#0d6efd]">
          {title}
        </h2>
        {/* Show excerpt if enabled */}
        {siteConfig.postCard.showExcerpt && (
          <p className="text-gray-600 mt-2 text-sm">{excerpt}</p>
        )}
      </Link>

      <div className="flex justify-between items-center mt-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Link href={`/author/${author.slug}`} className="flex items-center">
            {/* Show author profile picture if enabled */}
            {siteConfig.postCard.showAuthorProfilePicture && (
              <ContentfulImage
                {...author.photo!}
                className="rounded-full h-9 w-9 mr-2"
              />
            )}
          </Link>
          {/* Show date and author */}
          <div>
            <Link href={`/author/${author.slug}`}>
              <p>{author?.fullName}</p>
            </Link>
            <p className="text-sm text-gray-500">{formatDate(date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardDesignSquared = ({
  title,
  date,
  slug,
  image,
  excerpt,
  author,
  readingTime,
}: CardDesignProps) => {
  return (
    <div className="p-2">
      <Link href={`/posts/${slug}`}>
        {/* Show image */}
        <ContentfulImage
          src={image.src}
          alt={image.alt}
          height={image.height}
          width={image.width}
          className="w-full object-cover h-1/2 hover:opacity-80 transition-opacity"
        />
        {/* Show title */}
        <h2 className="text-xl font-normal mt-0 mb-1 hover:text-[#0d6efd]">
          {title}
        </h2>
        {/* Show excerpt if enabled */}
        {siteConfig.postCard.showExcerpt && (
          <p className="text-gray-600 mt-2 text-sm">{excerpt}</p>
        )}
      </Link>

      <div className="flex justify-between items-center mt-4 mb-4 text-sm text-gray-500">
        <p className="text-sm text-gray-500">{formatDate(date)}</p>
        <div className="flex items-center">
          <Link href={`/author/${author.slug}`} className="flex items-center">
            {/* Show author profile picture if enabled */}
            {siteConfig.postCard.showAuthorProfilePicture && (
              <ContentfulImage
                {...author.photo!}
                className="rounded-full h-6 w-6 mr-2"
              />
            )}
            <p className="mr-2">{author?.fullName}</p>
          </Link>
        </div>
        <p className="text-sm text-gray-500">{readingTime}</p>
      </div>
    </div>
  );
};

const CardDesignSquared2 = ({
  title,
  date,
  slug,
  image,
  excerpt,
  author,
  readingTime,
}: CardDesignProps) => {
  return (
    <div className="p-2">
      <Link href={`/posts/${slug}`}>
        {/* Show image */}
        <ContentfulImage
          src={image.src}
          alt={image.alt}
          height={image.height}
          width={image.width}
          className="w-full object-cover h-1/2 hover:opacity-80 transition-opacity"
        />
        {/* Show title */}
        <h2 className="text-xl font-normal mt-0 mb-1 hover:text-[#0d6efd]">
          {title}
        </h2>
        {/* Show excerpt if enabled */}
        {siteConfig.postCard.showExcerpt && (
          <p className="text-gray-600 mt-2 text-sm">{excerpt}</p>
        )}
      </Link>

      <div className="flex justify-between items-end mt-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Link href={`/author/${author.slug}`} className="flex items-center">
            {/* Show author profile picture if enabled */}
            {siteConfig.postCard.showAuthorProfilePicture && (
              <ContentfulImage
                {...author.photo!}
                className="rounded-full h-9 w-9 mr-2"
              />
            )}
          </Link>
          {/* Show date and author */}
          <div>
            <Link href={`/author/${author.slug}`}>
              <p>{author?.fullName}</p>
            </Link>
            <p className="text-sm text-gray-500">{formatDate(date)}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">{readingTime}</p>
      </div>
    </div>
  );
};
