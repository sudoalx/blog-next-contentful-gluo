"use client";
import React, { useState } from "react";
import { FaCaretRight } from "react-icons/fa6";

export const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };
  return (
    <div className="font-extralight text-base p-2">
      {/* For displays smaller than md, show the clickable button */}
      <div className="flex gap-2 items-center">
        <button className="flex gap-2 items-center" onClick={toggleCollapse}>
          <FaCaretRight
            className={`inline-block text-[#d2fc51] text-2xl -ml-2 ${
              !isCollapsed ? "rotate-90" : ""
            }`}
          />
          <h4 className="m-0 font-light text-lg">Contents</h4>
        </button>
      </div>

      {/* For displays smaller than md then make collapsible <ol> */}
      <ol
        className={`flex flex-col lg:block list-none pl-0 mt-4 mb-0 ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {children}
      </ol>
    </div>
  );
};
