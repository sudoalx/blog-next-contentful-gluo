import { BlogPost } from "@/contentful/lib/";
import { Card } from "../posts/PostCard";

interface GridProps {
  blogPosts: BlogPost[];
}

export const Grid = async ({ blogPosts }: GridProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-row-dense w-full">
        {blogPosts.map((post: BlogPost) => (
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
