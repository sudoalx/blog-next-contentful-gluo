import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";

export interface TypePostFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    thumbnail: EntryFieldTypes.AssetLink;
    featuredImage: EntryFieldTypes.AssetLink;
    metaDescription?: EntryFieldTypes.Symbol;
    metaKeywords?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    creationDate?: EntryFieldTypes.Date;
    readingTime?: EntryFieldTypes.Integer;
    excerpt?: EntryFieldTypes.RichText;
    body?: EntryFieldTypes.RichText;
    author?: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
}

export type TypePostSkeleton = EntrySkeletonType<TypePostFields, "post">;
export type TypePost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePostSkeleton, Modifiers, Locales>;
