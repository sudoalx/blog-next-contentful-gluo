import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAuthorFields {
    photo?: EntryFieldTypes.AssetLink;
    fullName?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    biography?: EntryFieldTypes.RichText;
}

export type TypeAuthorSkeleton = EntrySkeletonType<TypeAuthorFields, "author">;
export type TypeAuthor<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAuthorSkeleton, Modifiers, Locales>;
