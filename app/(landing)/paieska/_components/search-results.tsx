"use client";

import { search } from "@/actions/jobs";
import { PaginationSection } from "@/components/pagination-section";
import { useQuery } from "@tanstack/react-query";

type SearchResultsProps = {
  query: string;
};

const SearchResults = ({ query }: SearchResultsProps) => {
  const { data } = useQuery({
    queryKey: ["jobs", "search", query],
    queryFn: async () => search(query),
  });

  return (
    <div>
      <PaginationSection itemsPerPageNumber={10} jobsData={data} />
    </div>
  );
};

export default SearchResults;
