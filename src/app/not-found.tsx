import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl mb-10 mt-20 eina-light">404 - Page Not Found</h1>
      <h2 className="text-2xl mb-10 mt-20 eina-light">
        Go back to{" "}
        <Link href="/" className="text-blue-500 hover:underline">
          homepage
        </Link>
      </h2>
    </main>
  );
}
