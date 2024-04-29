"use client";
import { BlogPost } from "@/contentful/lib/";
import { DiscussionEmbed } from "disqus-react";
import { siteConfig } from "@/app/config";

interface DisqusCommentsProps {
  post: BlogPost;
}

export const DisqusComments = ({ post }: DisqusCommentsProps) => {
  const pageUrl = `${siteConfig.url}posts/${post.slug}`;
  const disqusConfig = {
    url: pageUrl,
    identifier: post.slug,
    title: post.title,
  };
  return (
    <DiscussionEmbed shortname="gluo-developer-blog" config={disqusConfig} />
  );
};
