"use client";
import { DiscussionEmbed } from "disqus-react";

interface DisqusCommentsProps {
  post: any;
}

export const DisqusComments = ({ post }: DisqusCommentsProps) => {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const disqusConfig = {
    url: pageUrl,
    identifier: post.slug,
    title: post.title,
  };
  return <DiscussionEmbed shortname="gluo-dev-blog" config={disqusConfig} />;
};
