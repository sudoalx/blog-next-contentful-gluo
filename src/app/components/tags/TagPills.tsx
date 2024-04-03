import Link from "next/link";

export const TagPills = () => {
  return (
    <div>
      <ul className="flex gap-4 mt-4">
        <li className="mt-4">
          <Link
            href="/tags/tag-1"
            className="border bg-gray-200 rounded-full px-3 py-2"
          >
            Tag 1
          </Link>
        </li>
        <li className="mt-4">
          <Link
            href="/tags/tag-2"
            className="border bg-gray-200 rounded-full px-3 py-2"
          >
            Tag 2
          </Link>
        </li>
        <li className="mt-4">
          <Link
            href="/tags/tag-3"
            className="border bg-gray-200 rounded-full px-3 py-2"
          >
            Tag 3
          </Link>
        </li>
        <li className="mt-4">
          <Link
            href="/tags/tag-4"
            className="border bg-gray-200 rounded-full px-3 py-2"
          >
            Tag 4
          </Link>
        </li>
      </ul>
    </div>
  );
};
