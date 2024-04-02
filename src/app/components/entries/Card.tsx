import Image from "next/image";

interface CardProps {
  title: string;
  date: string;
  author: string;
  readingTime: string;
}
export const Card = ({ title, date, author, readingTime }: CardProps) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <Image
        alt="Placeholder image"
        // wider than taller
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
    </div>
  );
};
