import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeFooterFields {
    footerName: EntryFieldTypes.Symbol;
    firstColumnTitle: EntryFieldTypes.Symbol;
    instagramLink: EntryFieldTypes.Symbol;
    linkedInLink: EntryFieldTypes.Symbol;
    youTubeLink: EntryFieldTypes.Symbol;
    titleSecondColumn: EntryFieldTypes.Symbol;
    locations: EntryFieldTypes.RichText;
    phoneNumber: EntryFieldTypes.Symbol;
    madeIn: EntryFieldTypes.Symbol;
}

export type TypeFooterSkeleton = EntrySkeletonType<TypeFooterFields, "footer">;
export type TypeFooter<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeFooterSkeleton, Modifiers, Locales>;
