"use server";
import Image, { ImageLoaderProps } from "next/image";

interface NextImageProps {
  alt: string;
  src: string;
  height: number;
  width: number;
  className?: string;
}

const contentfulLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality ?? 75}`;
};

const ContentfulImage = async (props: NextImageProps) => {
  const { src, ...rest } = props;
  return <Image src={`https:${props.src}`} {...rest} />;
};

export default ContentfulImage;
