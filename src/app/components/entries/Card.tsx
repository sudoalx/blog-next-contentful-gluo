import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  date: string;
  author: string;
  readingTime: number | null;
  slug: string;
  image: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
  excerpt?: any;
}

export const Card = ({
  title,
  date,
  author,
  readingTime,
  slug,
  image = {
    src: "https://via.placeholder.com/850x500",
    alt: "Placeholder image",
    height: 500,
    width: 850,
  },
  excerpt,
}: CardProps) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <Link href={slug}>
        <Image
          src={`https:${image.src}`}
          alt={image.alt}
          height={image.height}
          width={image.width}
          className="rounded-lg mb-4 w-full"
        />
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{excerpt}... </p>
      </Link>
      <Link
        href={slug}
        className="text-blue-500 hover:underline font-semibold mt-2"
      >
        Read more
      </Link>

      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <p className="text-sm text-gray-500">Date: {date}</p>
        <p className="text-sm text-gray-500">{author}</p>
        <p className="text-sm text-gray-500">{`${readingTime} min`}</p>
      </div>
    </div>
  );
};
