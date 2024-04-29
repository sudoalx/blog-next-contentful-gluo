import { BlogPost } from "@/contentful/lib/blogPosts";
import { Card } from "../posts/PostCard";
import { siteConfig } from "@/app/config";

interface GridProps {
  blogPosts: BlogPost[];
}

export const Grid = async ({ blogPosts }: GridProps) => {
  const gridSize = `lg:grid-cols-${siteConfig.postsGrid.numberOfColumns}`;
  return (
    <div className="w-full">
      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${gridSize}`}>
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
