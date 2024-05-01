"use client";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/app/utils/generatePaginationNumbers";
import clsx from "clsx";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ?? 1;
  const allPages = generatePagination(+currentPage, totalPages);

  const createPageLinks = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === "...") {
      // if the page number is ..., return the current page
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber === 0) {
      // if the page number is 0, return the current page
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber > totalPages) {
      // if the page number is greater than the total number of pages, return the current page
      return `${pathName}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`; // return the new page number
  };

  if (+currentPage > totalPages) {
    return redirect(createPageLinks(totalPages));
  }
  if (+currentPage < 1 || isNaN(+currentPage)) {
    return redirect(createPageLinks(1));
  }

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          {/* Previous button */}
          <li className={`page-item ${+currentPage === 1 ? "disabled" : ""}`}>
            <Link
              className={`
              flex items-center justify-center h-full relative py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded ${
                +currentPage === 1
                  ? "text-gray-500 pointer-events-none"
                  : "text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              }  
              `}
              href={createPageLinks(+currentPage - 1)}
              aria-disabled={+currentPage === 1 ? "true" : "false"}
            >
              <GrLinkPrevious className="inline-block align-middle" />
            </Link>
          </li>

          {/* Page numbers */}

          {allPages.map((page, index) => (
            <li key={`${index}-${page}`} className="page-item">
              <Link
                className={`relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded ${
                  +currentPage === page
                    ? "text-white bg-blue-600 shadow-md"
                    : "text-gray-800 bg-transparent hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                }`}
                href={createPageLinks(page)}
              >
                {page}{" "}
                {page === currentPage && (
                  <span className="visually-hidden"></span>
                )}
              </Link>
            </li>
          ))}

          {/* Next button */}
          <li
            className={`page-item ${
              +currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <Link
              className={clsx(
                "flex items-center justify-center h-full relative py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded",
                {
                  "text-gray-500 pointer-events-none":
                    +currentPage === totalPages,
                  "text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none":
                    +currentPage !== totalPages,
                }
              )}
              aria-disabled={+currentPage === totalPages ? "true" : "false"}
              href={createPageLinks(+currentPage + 1)}
            >
              <GrLinkNext className="inline-block align-middle" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
