"use client";

import Link from "next/link";

import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

import { MonitorCog } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const MobileNavigation = () => {
  return (
    <div className="flex flex-row justify-between items-center sticky top-0 p-2.5 backdrop-blur-lg transition-all z-50">
      <div className="flex space-x-4">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="font-normal border-none"
        >
          <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Link href="/profilis">
                <MonitorCog className="size-7" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Skelbimų valdymas</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex space-x-2">
        <Link href="/hiring">
          <Button
            size="default"
            className="rounded-2xl text-sm bg-neutral-950 hover:bg-neutral-950/90"
          >
            Įdėti skelbimą - 5&euro;
          </Button>
        </Link>
      </div>
    </div>
  );
};
