"use client";
import { useUrl } from "nextjs-current-url";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface ShareButtonsProps {
  url?: string;
  title: string;
}

export const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const { href: currentUrl } = useUrl() ?? {};

  return (
    <div className="flex gap-4 mt-12 mb-6 align-middle">
      <span className="flex items-center text-sm text-gray-500">Share!</span>
      <LinkedinShareButton url={url ?? currentUrl!} title={title}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <TwitterShareButton url={url ?? currentUrl!} title={title}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <FacebookShareButton url={url ?? currentUrl!} hashtag={title}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton url={url ?? currentUrl!} title={title}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  );
};
