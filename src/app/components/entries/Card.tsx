import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  date: string;
  author: string;
  readingTime: string;
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
    <div className="p-4 border border-gray-200 ">
      <Link href={slug}>
        <Image
          src={`https:${image.src}`}
          alt={image.alt}
          height={image.height}
          width={image.width}
          // set height and width to maintain aspect ratio
          className="rounded-lg mb-4 w-full h-40 object-cover"
        />
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{excerpt}</p>
      </Link>
      <Link
        href={slug}
        className="text-blue-500 hover:underline font-semibold mt-2"
      >
        Read more
      </Link>

      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-500">{author}</p>
        <p className="text-sm text-gray-500">{`${readingTime}`}</p>
      </div>
    </div>
  );
};
