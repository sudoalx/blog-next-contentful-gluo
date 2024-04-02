const recentPosts = [
  {
    id: 1,
    title: "Post 1",
    content: "This is the first post",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is the second post",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is the third post",
  },
  {
    id: 4,
    title: "Post 4",
    content: "This is the fourth post",
  },
  {
    id: 5,
    title: "Post 5",
    content: "This is the fifth post",
  },
];

export const Sidebar = () => {
  return (
    <div className="lg:w-1/4 p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold">Recent Posts</h2>
      <ul className="mt-2">
        {recentPosts.map((post) => (
          <li key={post.id} className="mb-2">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
