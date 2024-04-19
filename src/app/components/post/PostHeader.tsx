import { BlogPost } from "@/contentful/lib/blogPosts";
import { PostInfo } from "../metadata/PostInfo";
import { ShareButtons } from "../metadata/ShareButtons";
import { TagPills } from "../tags/TagPills";
import ContentfulImage from "../ui/ContentfulImage";

interface PostHeaderProps {
  blogPost: BlogPost;
}

export const PostHeader = ({ blogPost }: PostHeaderProps) => {
  const { title, authorId, creationDate, body, featuredImage, categories } =
    blogPost;
  console.log(categories);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-2">
      {/* Top left section */}
      <div>
        {/* The blog post title */}
        <h1 className="text-4xl font-bold">{title}</h1>
        {/* The blog post info */}
        <PostInfo
          authorId={authorId!}
          creationDate={creationDate!}
          body={body!}
        />
        <div>
          {/* The tags for the blog post */}
          <TagPills />
        </div>
        {/* The share buttons */}
        <ShareButtons title={title} />
      </div>
      {/* Top right section */}
      <div className="flex justify-end">
        <div>{featuredImage && <ContentfulImage {...featuredImage} />}</div>
      </div>
    </div>
  );
};
