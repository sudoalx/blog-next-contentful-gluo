"use client";
import { BlogPost } from "@/contentful/lib/blogPosts";
import { DiscussionEmbed } from "disqus-react";

interface DisqusCommentsProps {
  post: BlogPost;
}

export const DisqusComments = ({ post }: DisqusCommentsProps) => {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const disqusConfig = {
    url: pageUrl,
    identifier: post.title,
    title: post.title,
  };
  return <DiscussionEmbed shortname="gluo-dev-blog" config={disqusConfig} />;
};
