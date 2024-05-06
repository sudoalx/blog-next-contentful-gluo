import { asm } from "@/app/config/fonts";
import { getMenu } from "@/app/utils/getMenu";
import Link from "next/link";

export const NavbarItems = async () => {
  // Fetch the Navbar Menu
  const navBar = await getMenu();
  const isActive = false;
  return (
    <>
      {/* Navigation items */}
      {navBar.navItems?.map((item, index) => {
        if (item) {
          return (
            <li key={`${index}-${item.path}`}>
              <Link
                href={item.path}
                className={`${asm.className} ${
                  item.showAsButton
                    ? "text-base bg-[#D2FC51] px-6 py-4 rounded-lg"
                    : "py-4 w-full relative inline-block"
                }`}
              >
                {`${item.title}`}
                {/* Active indicator */}
                {isActive && !item.showAsButton && (
                  <span className="absolute top-7 left-0 w-full h-4 bg-[#D2FC51] z-[-1]" />
                )}
              </Link>
            </li>
          );
        }
      })}
    </>
  );
};

export const NavbarItemsMobile = async () => {
  // Fetch the Navbar Menu
  const navBar = await getMenu();
  const isActive = false;
  return (
    // Full screen mobile menu
    <>
      {navBar.navItems?.map((item, index) => {
        if (item) {
          return (
            <li key={`${index}-${item.path}`}>
              <Link
                href={item.path}
                className={`${asm.className} py-4 w-full relative inline-block`}
              >
                {`${item.title}`}
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute top-7 left-0 w-full h-4 bg-[#D2FC51] z-[-1]" />
                )}
              </Link>
            </li>
          );
        }
      })}
    </>
  );
};
