import { BookmarkInfo } from "@/lib/types";
import { cn } from "@/lib/utils";

import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { bookmark } from "@/actions/jobs";

interface BookmarkBtnProps {
  jobId: string;
  initialState: BookmarkInfo;
}

const BookmarkBtn = ({ jobId, initialState }: BookmarkBtnProps) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["bookmark-info", jobId];

  const { data } = useQuery({
    queryKey,
    queryFn: async () => bookmark(jobId),

    initialData: initialState,
    staleTime: Infinity,
  });

  return <div>BookmarkBtn</div>;
};

export default BookmarkBtn;
