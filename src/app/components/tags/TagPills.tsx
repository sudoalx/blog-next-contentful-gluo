import Link from "next/link";

interface TagPillsProps {
  slug: string;
  tags: string[];
}

export const TagPills = ({ slug, tags }: TagPillsProps) => {
  return (
    <div>
      <ul className="flex gap-2 sm:gap-4 mt-4 flex-wrap">
        {tags.map((tag: string) => (
          <li key={tag}>
            <Link
              href={`/${slug}/${tag.replace(" ", "-").toLowerCase()}`}
              className="px-4 py-2 bg-[#F4F4F0] text-xs hover:bg-gray-300 rounded-full capitalize"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
