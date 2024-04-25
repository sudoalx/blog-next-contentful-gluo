interface TagsPageProps {
  params: {
    tag: string;
  };
}

export default function TagsPage({ params }: Readonly<TagsPageProps>) {
  return (
    <div>
      <h1>Tags for: {params.tag}</h1>
    </div>
  );
}
