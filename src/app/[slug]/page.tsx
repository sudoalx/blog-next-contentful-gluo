interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  // deencode the slug
  const decodedSlug = decodeURIComponent(params.slug.replace(/-/g, " "));
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">{decodedSlug}</h1>
      <p className="text-lg mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur error
        voluptates dolor itaque, rerum, ducimus quisquam illo quae esse iure
        nulla officiis fuga quia deserunt corporis, cumque quibusdam repellendus
        illum? Tenetur illo dolor veritatis ea dolore ipsum, corrupti nisi
        laudantium cum fuga sint debitis soluta accusantium quae ullam accusamus
        aliquid omnis officiis blanditiis corporis! Aut excepturi voluptatibus
        sequi maiores veniam. Est ipsum at excepturi perferendis, blanditiis
        maiores, magni numquam deleniti sit labore reprehenderit soluta in
        obcaecati illum laudantium laborum sint eligendi quam distinctio.
        Blanditiis, esse laborum! Nulla exercitationem laboriosam inventore.
        Doloremque quis culpa tempora distinctio similique accusantium illo
        laborum accusamus, nisi doloribus deleniti, eaque suscipit! Ipsum qui
        laboriosam blanditiis! Aliquam veniam, corporis similique possimus
        veritatis reiciendis quod ea ipsam! Cupiditate?
      </p>
      <h2 className="text-2xl font-semibold mt-8 border-b border-gray-200 pb-4">
        Lorem ipsum dolor
      </h2>
      <p className="text-lg mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur error
        voluptates dolor itaque, rerum, ducimus quisquam illo quae esse iure
        nulla officiis fuga quia deserunt corporis, cumque quibusdam repellendus
        illum? Tenetur illo dolor veritatis ea dolore ipsum, corrupti nisi
        laudantium cum fuga sint debitis soluta accusantium quae ullam accusamus
        aliquid omnis officiis blanditiis corporis! Aut excepturi voluptatibus
        sequi maiores veniam. Est ipsum at excepturi perferendis, blanditiis
        maiores, magni numquam deleniti sit labore reprehenderit soluta in
        obcaecati illum laudantium laborum sint eligendi quam distinctio.
        Blanditiis, esse laborum! Nulla exercitationem laboriosam inventore.
        Doloremque quis culpa tempora distinctio similique accusantium illo
        laborum accusamus, nisi doloribus deleniti, eaque suscipit! Ipsum qui
        laboriosam blanditiis! Aliquam veniam, corporis similique possimus
        veritatis reiciendis quod ea ipsam! Cupiditate?
      </p>

      <h2 className="text-2xl font-semibold mt-8 border-b border-gray-200 pb-4">
        Lorem ipsum dolor
      </h2>
      <p className="text-lg mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur error
        voluptates dolor itaque, rerum, ducimus quisquam illo quae esse iure
        nulla officiis fuga quia deserunt corporis, cumque quibusdam repellendus
        illum? Tenetur illo dolor veritatis ea dolore ipsum, corrupti nisi
        laudantium cum fuga sint debitis soluta accusantium quae ullam accusamus
        aliquid omnis officiis blanditiis corporis! Aut excepturi voluptatibus
        sequi maiores veniam. Est ipsum at excepturi perferendis, blanditiis
        maiores, magni numquam deleniti sit labore reprehenderit soluta in
        obcaecati illum laudantium laborum sint eligendi quam distinctio.
        Blanditiis, esse laborum! Nulla exercitationem laboriosam inventore.
        Doloremque quis culpa tempora distinctio similique accusantium illo
        laborum accusamus, nisi doloribus deleniti, eaque suscipit! Ipsum qui
        laboriosam blanditiis! Aliquam veniam, corporis similique possimus
        veritatis reiciendis quod ea ipsam! Cupiditate?
      </p>

      <div>
        <h3 className="text-2xl font-semibold mt-8 mb-4 border-b border-gray-200 pb-4">
          Related
        </h3>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <img
              alt="Placeholder image"
              src={"https://via.placeholder.com/850x500"}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-xl font-semibold">Blog Post 1</h2>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <p className="text-sm text-gray-500">2021-09-01</p>
              <p className="text-sm text-gray-500">Author</p>
              <p className="text-sm text-gray-500">5 min read</p>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <img
              alt="Placeholder image"
              src={"https://via.placeholder.com/850x500"}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-xl font-semibold">Blog Post 2</h2>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <p className="text-sm text-gray-500">2021-09-01</p>
              <p className="text-sm text-gray-500">Author</p>
              <p className="text-sm text-gray-500">5 min read</p>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <img
              alt="Placeholder image"
              src={"https://via.placeholder.com/850x500"}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-xl font-semibold">Blog Post 3</h2>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <p className="text-sm text-gray-500">2021-09-01</p>
              <p className="text-sm text-gray-500">Author</p>
              <p className="text-sm text-gray-500">5 min read</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
