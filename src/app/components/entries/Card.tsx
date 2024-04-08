import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  date: string;
  author: string;
  readingTime: string;
  slug: string;
}
export const Card = ({ title, date, author, readingTime, slug }: CardProps) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <Link href={slug}>
        <Image
          alt="Placeholder image"
          src={"https://via.placeholder.com/850x500"}
          width={850}
          height={500}
          className="rounded-lg mb-4 w-full"
        />
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-sm text-gray-500">{author}</p>
          <p className="text-sm text-gray-500">{readingTime}</p>
        </div>
      </Link>
    </div>
  );
};
