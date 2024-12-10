import { Metadata } from "next";
import SearchResults from "./_components/search-results";

type Searchprops = {
  searchParams: { q: string };
};

export function generateMetaData({
  searchParams: { q },
}: Searchprops): Metadata {
  return {
    title: `Search results for "${q}`,
  };
}

export default async function Search({ searchParams: { q } }: Searchprops) {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
            Search results for &quot;{q}&quot;
          </h1>
        </div>
        <SearchResults query={q} />
      </div>
    </main>
  );
}
