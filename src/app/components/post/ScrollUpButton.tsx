"use client";
import { useState } from "react";
import { GoArrowUp } from "react-icons/go";

export const ScrollUpButton = () => {
  const [ShowButton, setShowButton] = useState(false);
  // get the scroll position
  window.addEventListener("scroll", () => {
    //   hide the button if the scroll position is less than 100
    if (window.scrollY < 250) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  });

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`sticky bg-[#d2fc51] text-black text-lg font-bold p-4 top-[92%] flex justify-center items-center rounded-full w-12 h-12 right-4 z-50 ${
        ShowButton ? "" : "hidden transition-all animate-pulse"
      }`}
      onClick={scrollUp}
    >
      <GoArrowUp className="m-0 p-0 font-thin" />
    </button>
  );
};
