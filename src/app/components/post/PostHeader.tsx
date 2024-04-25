import { BlogPost } from "@/contentful/lib/blogPosts";
import { PostInfo } from "../metadata/PostInfo";
import { ShareButtons } from "../metadata/ShareButtons";
import { TagPills } from "../tags/TagPills";
import ContentfulImage from "../ui/ContentfulImage";
import Link from "next/link";
import siteConfig from "../../../../config/site.config";

interface PostHeaderProps {
  blogPost: BlogPost;
}

export const PostHeader = ({ blogPost }: PostHeaderProps) => {
  const { title, authorId, creationDate, body, featuredImage, category } =
    blogPost;

  const categoryString = category.fields.category;

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
        <div className="flex gap-2 sm:gap-4 mt-4 flex-wrap">
          <Link
            href={`/category/${categoryString.toLowerCase()}`}
            className="border bg-gray-200 rounded-full px-3 py-2 text-xs capitalize"
          >
            {categoryString}
          </Link>
        </div>

        {/* The share buttons */}
        {siteConfig.shareMenu.enabled && <ShareButtons title={title} />}
      </div>
      {/* Top right section */}
      <div className="flex justify-end">
        <div>{featuredImage && <ContentfulImage {...featuredImage} />}</div>
      </div>
    </div>
  );
};
