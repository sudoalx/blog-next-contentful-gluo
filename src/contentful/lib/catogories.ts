import { TypeCategoriesSkeleton } from "@/contentful/types";
import { Entry } from "contentful";
import contentfulClient from "./contentfulClient";

type CategoryEntry = Entry<TypeCategoriesSkeleton, undefined, string>;

// Category interface
export interface Category {
  category: string;
}

// A function to transform a Contentful category entry
// into our own category object.
export function parseContentfulCategory(
  category: CategoryEntry
): Category | null {
  if (!category) {
    return null;
  }
  return {
    category: category.fields.category,
  };
}

// A function to fetch all categories.
export async function fetchAllCategories(): Promise<Category[]> {
  const contentful = contentfulClient({});

  const categoriesResult = await contentful.getEntries<TypeCategoriesSkeleton>({
    content_type: "categories",
    include: 2,
    order: ["fields.category"],
  });

  return categoriesResult.items.map(
    (category) => parseContentfulCategory(category) as Category
  );
}
