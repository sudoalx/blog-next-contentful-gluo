import { draftMode } from "next/headers";
import ExitDraftModeLink from "../components/preview/ExitDraftModeLink";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {draftMode().isEnabled && (
        <p className="bg-orange-200 py-4 px-[6vw]">
          Draft mode is on! <ExitDraftModeLink className="underline" />
        </p>
      )}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
}
