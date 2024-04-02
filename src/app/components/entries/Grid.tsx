import { Card } from "./Card";

const posts = [
  {
    title: "Hello World",
    date: "2021-01-01",
    author: "John Doe",
    readingTime: "5 min",
  },
  {
    title: "Introduction to Next.js",
    date: "2021-01-02",
    author: "Jane Doe",
    readingTime: "10 min",
  },
  {
    title: "Tailwind CSS",
    date: "2021-01-03",
    author: "Danny Doe",
    readingTime: "7 min",
  },
  {
    title: "React Hooks",
    date: "2021-01-04",
    author: "Josh Doe",
    readingTime: "15 min",
  },
  {
    title: "How to use TypeScript with React",
    date: "2021-01-05",
    author: "James Doe",
    readingTime: "5 min",
  },
  {
    title: "Building a Serverless API with Next.js",
    date: "2021-01-06",
    author: "Emily Doe",
    readingTime: "12 min",
  },
  {
    title: "Optimizing React Performance",
    date: "2021-01-07",
    author: "Michael Doe",
    readingTime: "8 min",
  },
  {
    title: "Introduction to GraphQL",
    date: "2021-01-08",
    author: "Sarah Doe",
    readingTime: "20 min",
  },
  {
    title: "Styling in React with Styled Components",
    date: "2021-01-09",
    author: "David Doe",
    readingTime: "10 min",
  },
  {
    title: "Testing React Applications",
    date: "2021-01-10",
    author: "Jessica Doe",
    readingTime: "15 min",
  },
];

export const Grid = () => {
  return (
    <div className="w-3/4 p-4 border border-gray-200 rounded-lg">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => (
          <Card
            key={index}
            title={post.title}
            date={post.date}
            author={post.author}
            readingTime={post.readingTime}
          />
        ))}
      </div>
    </div>
  );
};
