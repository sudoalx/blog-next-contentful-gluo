import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "React",
  },
  {
    id: 2,
    title: "Next.js",
  },
  {
    id: 3,
    title: "Tailwind CSS",
  },
  {
    id: 4,
    title: "TypeScript",
  },
  {
    id: 5,
    title: "GraphQL",
  },
  {
    id: 6,
    title: "Node.js",
  },
];

export const Sidebar = () => {
  return (
    <div className="lg:w-1/6 p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold">Categories</h2>
      <ul className="mt-2">
        {categories.map((category) => (
          <li key={category.id} className="mt-2">
            <Link
              href={`/categories/${category.id}`}
              className="text-blue-500 hover:underline"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
