import Image from "next/image";

export const RelatedPosts = () => {
  return (
    <>
      {/* Related posts */}
      <div>
        <h3 className="text-2xl font-semibold mt-8 mb-4 border-b border-gray-200 pb-4">
          Related
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <Image
              width={850}
              height={500}
              alt="Placeholder image"
              src={"https://via.placeholder.com/850x500"}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-xl font-semibold">Blog Post 1</h2>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <p className="text-xs text-gray-500">2021-09-01</p>
              <p className="text-xs text-gray-500">Author</p>
              <p className="text-xs text-gray-500">5 min read</p>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <Image
              width={850}
              height={500}
              alt="Placeholder image"
              src={"https://via.placeholder.com/850x500"}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-xl font-semibold">Blog Post 2</h2>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <p className="text-xs text-gray-500">2021-09-01</p>
              <p className="text-xs text-gray-500">Author</p>
              <p className="text-xs text-gray-500">5 min read</p>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <Image
              width={850}
              height={500}
              alt="Placeholder image"
              src={"https://via.placeholder.com/850x500"}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-xl font-semibold">Blog Post 3</h2>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <p className="text-xs text-gray-500">2021-09-01</p>
              <p className="text-xs text-gray-500">Author</p>
              <p className="text-xs text-gray-500">5 min read</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
