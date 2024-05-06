import { UnresolvedLink } from "contentful";
import { TypeNavLink, TypeNavigationBarSkeleton } from "../types";
import { ContentImage, parseContentfulContentImage } from "./contentImage";
import contentfulClient from "./contentfulClient";

// A NavItem interface
export interface NavItem {
  title: string;
  path: string;
}

// A NavbarMenu interface
export interface NavbarMenu {
  name: string | undefined;
  logo: ContentImage | null;
  navItems: (TypeNavLink<any, any> | UnresolvedLink<"Entry">)[];
}

// A function to fetch Navbar Menu
export async function fetchNavbarMenu(): Promise<NavbarMenu[]> {
  const contentful = contentfulClient({});

  const navbarMenuResult =
    await contentful.getEntries<TypeNavigationBarSkeleton>({
      content_type: "navigationBar",
      include: 10,
      "fields.menuName": "Main Menu",
    }); // Fetch the Main Menu

  if (!navbarMenuResult.items.length) {
    return [];contentfulClient;
  }

  return navbarMenuResult.items.map((menu) => {
    return {
      name: menu.fields.menuName,
      logo: parseContentfulContentImage(menu.fields.logo),
      navItems: menu.fields.navbarLinks,
    };
  });
}
