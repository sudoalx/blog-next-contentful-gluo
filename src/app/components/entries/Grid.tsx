import { Card } from "./Card";

const posts = [
  {
    title: "Hello World",
    date: "2024-04-01",
    author: "John Doe",
    readingTime: "5 min",
  },
  {
    title: "Introduction to Next.js",
    date: "2024-04-02",
    author: "Jane Doe",
    readingTime: "10 min",
  },
  {
    title: "Tailwind CSS",
    date: "2024-04-03",
    author: "Danny Doe",
    readingTime: "7 min",
  },
  {
    title: "React Hooks",
    date: "2024-04-04",
    author: "Josh Doe",
    readingTime: "15 min",
  },
  {
    title: "How to use TypeScript with React",
    date: "2024-04-05",
    author: "James Doe",
    readingTime: "5 min",
  },
  {
    title: "Building a Serverless API with Next.js",
    date: "2024-04-06",
    author: "Emily Doe",
    readingTime: "12 min",
  },
  {
    title: "Optimizing React Performance",
    date: "2024-04-07",
    author: "Michael Doe",
    readingTime: "8 min",
  },
  {
    title: "Introduction to GraphQL",
    date: "2024-04-08",
    author: "Sarah Doe",
    readingTime: "20 min",
  },
  {
    title: "Styling in React with Styled Components",
    date: "2024-04-09",
    author: "David Doe",
    readingTime: "10 min",
  },
  {
    title: "Testing React Applications",
    date: "2024-04-10",
    author: "Jessica Doe",
    readingTime: "15 min",
  },
];

export const Grid = () => {
  return (
    <div className="w-full lg:w-3/4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.title}
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
