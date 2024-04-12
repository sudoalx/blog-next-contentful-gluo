"use client";
import { useUrl } from "nextjs-current-url";
import {
  FaClipboard,
  FaFacebook,
  FaLink,
  FaLinkedin,
  FaSquareXTwitter,
} from "react-icons/fa6";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

interface ShareButtonsProps {
  url?: string;
  title: string;
}

export const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const { href: currentUrl } = useUrl() ?? {};
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url ?? currentUrl!);
  };

  return (
    <div className="flex gap-4 mt-12 mb-6 align-middle">
      <span className="flex items-center text-sm text-gray-500">Share!</span>
      <LinkedinShareButton url={url ?? currentUrl!} title={title}>
        <FaLinkedin size={25} className="text-gray-500 hover:text-blue-500" />
      </LinkedinShareButton>
      <TwitterShareButton url={url ?? currentUrl!} title={title}>
        <FaSquareXTwitter
          size={25}
          className="text-gray-500 hover:text-black"
        />
      </TwitterShareButton>
      <FacebookShareButton url={url ?? currentUrl!} hashtag={title}>
        <FaFacebook size={25} className="text-gray-500 hover:text-blue-500" />
      </FacebookShareButton>
      <button
        className="flex items-center text-sm text-gray-500"
        onClick={copyToClipboard}
      >
        <FaLink size={24} />
      </button>
    </div>
  );
};
