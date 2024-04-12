import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { readingTime } from "reading-time-estimator";
import { draftMode } from "next/headers";
import { fetchBlogPosts } from "../../../contentful/blogPosts";
import { Card } from "./Card";
import { fetchAuthorProfileById } from "@/contentful/authorProfile";

export const Grid = async () => {
  // Fetch blog posts using the content preview
  // if draft mode is enabled:
  const blogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled });

  // Fetch author profiles in parallel
  const authorPromises = blogPosts.map((post) =>
    fetchAuthorProfileById(post.authorId!)
  );
  const authorProfiles = await Promise.all(authorPromises);

  // Calculate reading time for each post
  const postsWithReadingTime = blogPosts.map((post) => {
    const plainText = documentToPlainTextString(post.body!);
    const time = readingTime(plainText, 238);
    return { ...post, readingTime: time.text };
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Card
            key={post.title}
            title={post.title}
            date={post.creationDate!.toLocaleDateString()}
            author={authorProfiles[index]!.fullName!}
            readingTime={postsWithReadingTime[index].readingTime}
            slug={post.slug}
            image={post.thumbnail!}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
};
