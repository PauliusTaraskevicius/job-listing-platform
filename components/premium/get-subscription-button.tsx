"use client";

import usePremiumModal from "@/hooks/usePremiumModal";
import Link from "next/link";
import { Button } from "../ui/button";
import { PlusSquare } from "lucide-react";

interface GetSubscriptionButtonProps {
  canCreate: boolean;
}

export const GetSubscriptionButton = ({
  canCreate,
}: GetSubscriptionButtonProps) => {
  const premiumModal = usePremiumModal();

  if (canCreate) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/hiring">
          <PlusSquare className="size-5" />
          Talpinti Skelbimą
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="mx-auto flex w-fit gap-2"
    >
      <PlusSquare className="size-5" />
      Talpinti Skelbimą
    </Button>
  );
};
