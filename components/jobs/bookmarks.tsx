"use client";

import { getUserJobsWithBookmarks } from "@/actions/jobs";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Bookmarks = () => {
  const queryClient = useQueryClient();

  const { data, status, isLoading } = useQuery({
    queryKey: ["job-feed", "bookmarks"],
    queryFn: () => getUserJobsWithBookmarks(),
  });

  return (
    <div className="w-full px-4 lg:pl-2 lg:px-0 py-2">
      {data?.map((bookmark) => (
        <h1 key={bookmark.id}>
          {bookmark.job.title} {bookmark.job.city.cityTitle}{" "}
          {bookmark.job.salary}
        </h1>
      ))}
    </div>
  );
};

export default Bookmarks;
