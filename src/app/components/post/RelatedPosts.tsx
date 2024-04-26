import { Card } from "../posts/PostCard";
import {
  BlogPost,
  fetchRelatedBlogPostsByCategory,
} from "@/contentful/lib/blogPosts";

interface RelatedPostsProps {
  categoryId: string;
  currentPostId: string;
}

export const RelatedPosts = async ({
  categoryId,
  currentPostId,
}: RelatedPostsProps) => {
  const blogPosts = await fetchRelatedBlogPostsByCategory(
    categoryId,
    currentPostId
  );
  return (
    <>
      {/* Related posts */}
      <div>
        <h3 className="text-2xl font-semibold mt-8 mb-4 border-b border-gray-200 pb-4">
          Related
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {blogPosts.map((post: BlogPost) => (
            <Card
              key={post.title}
              title={post.title}
              date={new Date(post.creationDate!).toLocaleDateString()}
              authorId={post.authorId!}
              body={post.body!}
              slug={post.slug}
              image={post.thumbnail!}
              excerpt={post.excerpt!}
            />
          ))}
        </div>
      </div>
    </>
  );
};
