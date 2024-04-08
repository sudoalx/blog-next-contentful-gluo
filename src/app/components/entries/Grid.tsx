import { draftMode } from "next/headers";
import { fetchBlogPosts } from "../../../contentful/blogPosts";
import { Card } from "./Card";

export const Grid = async () => {
  // Fetch blog posts using the content preview
  // if draft mode is enabled:
  const blogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled });

  return (
    <div className="w-full lg:w-3/4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card
            key={post.title}
            title={post.title}
            date="2024-04-01"
            author="John Doe"
            readingTime="5 min"
            slug={post.slug}
            image={post.image!}
          />
        ))}
      </div>
    </div>
  );
};
