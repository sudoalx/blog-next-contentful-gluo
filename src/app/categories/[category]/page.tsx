interface CategoriesPageProps {
  params: {
    categories: string;
  };
}

export default function CategoriesPage({
  params,
}: Readonly<CategoriesPageProps>) {
  return (
    <div>
      <h1>Posts with the category: {params.categories}</h1>
    </div>
  );
}
