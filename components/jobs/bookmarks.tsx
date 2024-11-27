"use client";

import { getBookmarks } from "@/actions/jobs";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Bookmarks = () => {
  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: ["job-feed", "bookmarks"],
    queryFn: () => getBookmarks(),
  });

  return (
    <div>
      {data?.map((bookmark) => (
        <h1 key={bookmark.id}>{bookmark.job.title}</h1>
      ))}
    </div>
  );
};

export default Bookmarks;
