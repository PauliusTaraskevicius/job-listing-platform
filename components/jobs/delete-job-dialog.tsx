import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { JobProps } from "@/lib/types";
import { useDeletePostMutation } from "./mutation";

type DeleteJobDialogProps = {
  job: JobProps;
  open: boolean;
  onClose: () => void;
};

const DeleteJobDialog = ({ job, onClose, open }: DeleteJobDialogProps) => {
  const mutation = useDeletePostMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ištrinti skelbimą?</DialogTitle>
          <DialogDescription>
            Ar tikrai norite ištrinti skelbimą? Ištrynę skelbimą, sugražinti jo
            negalėsite.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate(job.id, { onSuccess: onClose })}
            disabled={mutation.isPending}
          >
            Ištrinti
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Atšaukti
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobDialog;
