import { BookmarkInfo } from "@/lib/types";
import { cn } from "@/lib/utils";

import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { createBookmark, deleteBookmark } from "@/actions/jobs";

import { Bookmark, BookmarkMinus } from "lucide-react";

interface BookmarkButtonProps {
  jobId: string;
  initialState: BookmarkInfo;
}

const BookmarkButton = ({ jobId, initialState }: BookmarkButtonProps) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["bookmark-info", jobId];

  const { data } = useQuery({
    queryKey,
    queryFn: () => createBookmark(jobId),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      data.isBookmarkedByUser ? deleteBookmark(jobId) : createBookmark(jobId),
    onMutate: async () => {
      toast({
        description: `Darbo skelbimas ${
          data.isBookmarkedByUser
            ? "ištrintas iš archyvų"
            : "išsaugotas archyve"
        }`,
      });

      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<BookmarkInfo>(queryKey);

      queryClient.setQueryData<BookmarkInfo>(queryKey, () => ({
        isBookmarkedByUser: !previousState?.isBookmarkedByUser,
      }));

      return { previousState };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Įvyko klaida. Bandykite dar kartą.",
      });
    },
  });

  return (
    <>
      <button onClick={() => mutate()} className="size-5">
        {data.isBookmarkedByUser ? (
          <Bookmark
            className={cn(
              "size-5 hover:fill-background",
              data.isBookmarkedByUser &&
                "fill-yellow-500 text-yellow-500 hover:fill-yellow-500"
            )}
          />
        ) : (
          <Bookmark
            className={cn(
              "size-5 hover:fill-yellow-500 hover:text-yellow-500",
              data.isBookmarkedByUser && "bg-neutral-50"
            )}
          />
        )}
      </button>
    </>
  );
};

export default BookmarkButton;
