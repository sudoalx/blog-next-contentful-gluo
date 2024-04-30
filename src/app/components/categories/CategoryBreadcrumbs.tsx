import { einaLight } from "@/app/config/fonts";
import Link from "next/link";
import React from "react";
import { SlArrowRight } from "react-icons/sl";

interface CategoryBreadcrumbsProps {
  decodedCategory: string;
}

export const CategoryBreadcrumbs = ({
  decodedCategory,
}: CategoryBreadcrumbsProps) => {
  return (
    <div
      className={`${einaLight.className} flex flex-wrap items-end gap-4 my-10 px-4 text-4xl`}
    >
      <Link href="/" className=" hover:text-blue-600" aria-label="Back to blog">
        Blog
      </Link>
      <SlArrowRight className="inline text-3xl" />
      <span className="capitalize">{decodedCategory}</span>
    </div>
  );
};
