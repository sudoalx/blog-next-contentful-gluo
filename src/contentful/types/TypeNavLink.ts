import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeNavLinkFields {
    title: EntryFieldTypes.Symbol;
    path: EntryFieldTypes.Symbol;
    showAsButton: EntryFieldTypes.Boolean;
}

export type TypeNavLinkSkeleton = EntrySkeletonType<TypeNavLinkFields, "navLink">;
export type TypeNavLink<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavLinkSkeleton, Modifiers, Locales>;
