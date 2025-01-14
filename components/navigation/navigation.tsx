"use client";
import Link from "next/link";

import { useMedia } from "react-use";
import { UserButton } from "@clerk/nextjs";

import { Button } from "../ui/button";

import { LuBriefcaseBusiness } from "react-icons/lu";
import { MobileNavigation } from "./mobile-navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Navigation = () => {
  const isMobile = useMedia("(max-width: 1024px)", false);

  if (isMobile) {
    return <MobileNavigation />;
  }

  return (
    <div className="hidden lg:flex justify-between items-center w-full sticky inset-x-0 top-0 h-[6rem] px-2 bg-white transition-all">
      <Link href="/" className="flex items-center gap-1 cursor-pointer">
        <LuBriefcaseBusiness className="size-11 text-neutral-950 dark:text-white" />
        DarbasMan
      </Link>

      <div className="flex justify-center items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <UserButton
                appearance={{ elements: { avatarBox: "size-9" } }}
                userProfileUrl="/profilis/user-profile"
                userProfileMode="navigation"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Mano profilis</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Link href="/hiring">
          <Button
            size="xl"
            className="rounded-2xl text-base bg-neutral-950 hover:bg-neutral-950/90 dark:bg-white"
          >
            Įdėti skelbimą - 5&euro;
          </Button>
        </Link>
      </div>
    </div>
  );
};
