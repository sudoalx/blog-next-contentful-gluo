import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeVideoEmbedFields {
    title: EntryFieldTypes.Symbol;
    embedUrl: EntryFieldTypes.Symbol;
}

export type TypeVideoEmbedSkeleton = EntrySkeletonType<TypeVideoEmbedFields, "videoEmbed">;
export type TypeVideoEmbed<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeVideoEmbedSkeleton, Modifiers, Locales>;
