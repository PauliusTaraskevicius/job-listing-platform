"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";

import { BriefcaseBusiness } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export const Navigation = () => {
  return (
    <div className="hidden lg:flex justify-between items-center w-full sticky inset-x-0 top-0 h-[6rem] px-2">
      <Link href="/" className="flex items-center gap-1 cursor-pointer">
        <BriefcaseBusiness className="size-11" />
        DarbasMan
      </Link>

      <div className="flex justify-center items-center space-x-4">
        <div className="flex space-x-2">
          <Button asChild>
            <UserButton />
          </Button>
          <ModeToggle />
        </div>
        <Link href="/hiring">
          <Button size="xl" className="rounded-2xl text-base">
            Įdėti skelbimą - 5&euro;
          </Button>
        </Link>
      </div>
    </div>
  );
};
