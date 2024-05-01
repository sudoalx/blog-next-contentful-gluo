export const generatePagination = (currentPage: number, totalPages: number) => {
  // if the total number of pages is less than or equal to 5, return an array of numbers from 1 to the total number of pages
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  // if the current page is less than or equal to 3, return an array of numbers from 1 to 3 then ... and the last page number
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  // if the current page is greater than or equal to the total number of pages minus 2, return an array of numbers from 1 to 3 then ... and the last page number
  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // if the current page is greater than 3 and less than the total number of pages minus 2, return an array of numbers from 1 to 3 then ... and the last page number
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
