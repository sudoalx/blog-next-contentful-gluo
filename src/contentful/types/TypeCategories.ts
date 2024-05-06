import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCategoriesFields {
    category: EntryFieldTypes.Symbol<"backend" | "cloud computing" | "frameworks" | "frontend" | "general">;
}

export type TypeCategoriesSkeleton = EntrySkeletonType<TypeCategoriesFields, "categories">;
export type TypeCategories<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCategoriesSkeleton, Modifiers, Locales>;
