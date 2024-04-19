import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";
import type { TypeCategoriesSkeleton } from "./TypeCategories";

export interface TypePostFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    thumbnail: EntryFieldTypes.AssetLink;
    excerpt: EntryFieldTypes.Symbol;
    featuredImage: EntryFieldTypes.AssetLink;
    metaDescription: EntryFieldTypes.Symbol;
    metaKeywords: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    creationDate: EntryFieldTypes.Date;
    body: EntryFieldTypes.RichText;
    author: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
    category: EntryFieldTypes.EntryLink<TypeCategoriesSkeleton>;
}

export type TypePostSkeleton = EntrySkeletonType<TypePostFields, "post">;
export type TypePost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePostSkeleton, Modifiers, Locales>;
