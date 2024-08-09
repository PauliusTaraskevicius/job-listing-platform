"use client";

import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";

export const Navigation = () => {
  return (
    <div className="hidden lg:flex w-full sticky inset-x-0 top-0 h-[6rem] bg-green-200">
      <Button asChild>
        <UserButton />
      </Button>
    </div>
  );
};
