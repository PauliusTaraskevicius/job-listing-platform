"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "@clerk/nextjs";

type Props = {
  path: string;
};

export const MobileNavigation = ({ path }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center sticky top-0 p-2.5 backdrop-blur-lg transition-all">
      <Button
        asChild
        variant="outline"
        size="sm"
        className="font-normal border-none"
      >
        <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
      </Button>
      <div className="flex space-x-2">
        <ModeToggle />
        {path === "/hiring" ? null : (
          <Link href="/hiring">
            <Button size="default" className="rounded-2xl text-sm bg-neutral-950 hover:bg-neutral-950/90">
              Įdėti skelbimą - 5&euro;
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
