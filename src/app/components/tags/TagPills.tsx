import Link from "next/link";

export const TagPills = ({ tags }: { tags: string[] }) => {
  return (
    <div>
      <ul className="flex gap-2 sm:gap-4 mt-4 flex-wrap">
        {tags.map((tag: string) => (
          <li key={tag}>
            <Link
              href={`/tags/${tag}`}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
