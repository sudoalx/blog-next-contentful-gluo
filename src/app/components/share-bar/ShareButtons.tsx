"use client";
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

export const ShareButtons = ({
  url = window.location.href,
  title,
}: ShareButtonsProps) => {
  return (
    <div className="flex gap-4 mt-12 mb-6 align-middle">
      <span className="flex items-center text-sm text-gray-500">Share!</span>

      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <FacebookShareButton url={url} hashtag={title}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  );
};
