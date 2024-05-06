import { ContentImage, fetchNavbarMenu } from "@/contentful/lib";
import { TypeNavLink } from "@/contentful/types";
import { UnresolvedLink } from "contentful";

interface NavbarItem {
  title: string;
  path: string;
  showAsButton: boolean;
}

interface NavbarMenu {
  name?: string;
  logo: ContentImage | null;
  navItems?: NavbarItem[];
}

// Type guard function to check if an item is resolved
const isResolved = (
  item: TypeNavLink<any, any> | UnresolvedLink<"Entry">
): item is TypeNavLink<any, any> => {
  return "fields" in item;
};

export const getMenu = async (): Promise<NavbarMenu> => {
  const navBar = await fetchNavbarMenu();
  const menu = navBar[0];
  const { name, logo, navItems } = menu;

  // Use map to transform navItems into NavbarItem array
  const navbarItems: NavbarItem[] = navItems
    .map((item) => {
      // Check if the item is resolved
      if (isResolved(item)) {
        // Return the transformed NavbarItem
        return {
          title: item.fields.title as string,
          path: item.fields.path as string,
          showAsButton: item.fields.showAsButton as boolean,
        };
      } else {
        console.log("Navigation item is unresolved:", item);
        // Return null for unresolved items
        return null;
      }
    })
    .filter((item): item is NavbarItem => item !== null); // Filter out null items and assert type

  return {
    name,
    logo,
    navItems: navbarItems,
  };
};
