import { deleteJobListing } from "@/actions/jobs";
import { useToast } from "../ui/use-toast";

import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { PostsPage } from "@/lib/types";

export function useDeletePostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: deleteJobListing,
    onSuccess: async (deletedJob) => {
      const queryFilter: QueryFilters = { queryKey: ["job-feed"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              jobs: page.jobs.filter((p) => p.id !== deletedJob.id),
            })),
          };
        }
      );

      toast({
        description: "Skelbimas ištrintas",
      });

      router.refresh();
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Skelbimo ištrinti nepavyko. Bandykite dar kartą.",
      });
    },
  });

  return mutation;
}
