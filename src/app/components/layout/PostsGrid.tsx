import { draftMode } from "next/headers";
import { fetchBlogPosts } from "../../../contentful/lib/blogPosts";
import { Card } from "../posts/PostCard";

export const Grid = async () => {
  const blogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Card
            key={post.title}
            title={post.title}
            date={new Date(post.creationDate!).toLocaleDateString()}
            authorId={post.authorId!}
            body={post.body!}
            slug={post.slug}
            image={post.thumbnail!}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
};
