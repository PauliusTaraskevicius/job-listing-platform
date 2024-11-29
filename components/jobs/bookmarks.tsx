"use client";

import { getBookmarks, getUserJobsWithBookmarks } from "@/actions/jobs";
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
    queryFn: () => getUserJobsWithBookmarks(),
  });

  return (
    <div className="w-full px-4 lg:pl-2 lg:px-0 py-2">
      {data?.data.map((bookmark) => (
        <h1 key={bookmark.id}>{bookmark.job.title} {bookmark.job.city.cityTitle}</h1>
      ))}

    </div>
  );
};

export default Bookmarks;
