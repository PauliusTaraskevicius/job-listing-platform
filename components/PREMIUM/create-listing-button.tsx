"use client";

import { Button } from "@/components/ui/button";

import { PlusSquare } from "lucide-react";
import Link from "next/link";
import usePremiumModal from "./usePremiumModal";

interface CreateListingButtonProps {
  canCreate: boolean;
}

export default function CreateListingButton({
  canCreate,
}: CreateListingButtonProps) {
  const premiumModal = usePremiumModal();

  if (canCreate) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/hiring">
          <PlusSquare className="size-5" />
          Įkelti skelbimą
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
      Įkelti skelbimą
    </Button>
  );
}
