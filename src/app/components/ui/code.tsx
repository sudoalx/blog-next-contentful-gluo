"use client";

import { useState } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { HiClipboardDocument } from "react-icons/hi2";

export function CodeBlock({
  id,
  language,
  snippet,
}: {
  id: string;
  language?: string;
  snippet?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied">("idle");

  if (!language || !snippet) {
    return null;
  }

  const copyCode = () => {
    navigator.clipboard.writeText(snippet);
    setStatus("copied");
  };

  return (
    <div className="w-full">
      <div className="w-full rounded-lg p-1 ring-1 ring-base-300 bg-base-300 text-xs">
        <div className="flex justify-between items-center mb-1 px-2">
          <span className="text-xs text-base-content-300">{language}</span>
          <button className="btn btn-xs btn-ghost" onClick={copyCode}>
            {status === "copied" ? (
              <>
                <HiClipboardDocument className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Copied</span>
              </>
            ) : (
              <>
                <HiClipboardDocument className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          language={language}
          style={materialDark}
          showLineNumbers
          customStyle={{ margin: 0, borderRadius: 5 }}
        >
          {snippet}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
