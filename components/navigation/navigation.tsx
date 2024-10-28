"use client";
import Link from "next/link";

import { useMedia } from "react-use";
import { UserButton, useUser } from "@clerk/nextjs";

import { Button } from "../ui/button";

import { BriefcaseBusiness, MonitorCog } from "lucide-react";
import { MobileNavigation } from "./mobile-navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Navigation = () => {
  const isMobile = useMedia("(max-width: 1024px)", false);
  const { user } = useUser();

  if (isMobile) {
    return <MobileNavigation />;
  }

  return (
    <div className="hidden lg:flex justify-between items-center w-full sticky inset-x-0 top-0 h-[6rem] px-2 backdrop-blur-lg transition-all">
      <Link href="/" className="flex items-center gap-1 cursor-pointer">
        <BriefcaseBusiness className="size-11 text-neutral-950 dark:text-white" />
        DarbasMan
      </Link>

      <div className="flex justify-center items-center space-x-4">
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <UserButton
                  appearance={{ elements: { avatarBox: "size-8" } }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Mano profilis</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {user && (
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
          )}
        </div>

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
