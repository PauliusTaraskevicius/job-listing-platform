"use client";

import { deleteJobListing, editJobListing } from "@/actions/jobs";
import { useToast } from "../ui/use-toast";

import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { PostsPage } from "@/lib/types";

import { jobType } from "../../actions/jobs/type";

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

      router.refresh();

      toast({
        description: "Skelbimas ištrintas",
      });
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

export function useUpdateJobListing(id: string) {
  const { toast } = useToast();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ values }: { values: jobType }) => {
      return Promise.all([editJobListing(id, values)]);
    },
    onSuccess: async () => {
      router.push("/skelbimai");

      router.refresh();

      toast({
        description: "Skelbimas atnaujintas",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Nepavyko redaguoti skelbimo. Bandykite dar kartą.",
      });
    },
  });

  return mutation;
}
