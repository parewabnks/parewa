interface Props {
  searchParams: Promise<{
    category?: string;
  }>;
}

async function Page({ searchParams }: Props) {
  const SearchParams = await searchParams;
  const category = SearchParams.category;

  return (
    <div className="min-h-screen px-10">
      <div className="font-heading text-5xl">{category?.toUpperCase()}</div>
    </div>
  );
}

export default Page;