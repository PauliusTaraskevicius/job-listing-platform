"use client";

import { search } from "@/actions/jobs";
import { useQuery } from "@tanstack/react-query";

type SearchResultsProps = {
  query: string;
};

const SearchResults = ({ query }: SearchResultsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["jobs", "search", query],
    queryFn: async () => search(query),
  });

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>
          <p>PAIESKA:</p>
          {item.title}

        </div>
      ))}
    </div>
  );
};

export default SearchResults;
