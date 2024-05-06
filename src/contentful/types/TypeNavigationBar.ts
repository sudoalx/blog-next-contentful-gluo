import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeNavLinkSkeleton } from "./TypeNavLink";

export interface TypeNavigationBarFields {
    menuName: EntryFieldTypes.Symbol;
    logo: EntryFieldTypes.AssetLink;
    navbarLinks: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavLinkSkeleton>>;
}

export type TypeNavigationBarSkeleton = EntrySkeletonType<TypeNavigationBarFields, "navigationBar">;
export type TypeNavigationBar<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationBarSkeleton, Modifiers, Locales>;
