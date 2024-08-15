"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMedia } from "react-use";
import { UserButton } from "@clerk/nextjs";

import { Button } from "./ui/button";

import { ModeToggle } from "./mode-toggle";

import { BriefcaseBusiness } from "lucide-react";
import { MobileNavigation } from "./mobile-navigation";

export const Navigation = () => {
  const path = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  if (isMobile) {
    return <MobileNavigation path={path} />;
  }

  return (
    <div className="hidden lg:flex justify-between items-center w-full sticky inset-x-0 top-0 h-[6rem] px-2 backdrop-blur-lg transition-all">
      <Link href="/" className="flex items-center gap-1 cursor-pointer">
        <BriefcaseBusiness className="size-11 text-neutral-950 dark:text-white" />
        DarbasMan
      </Link>

      <div className="flex justify-center items-center space-x-4">
        <div className="flex space-x-2">
          <Button asChild>
            <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
          </Button>
          <ModeToggle />
        </div>
        {path === "/hiring" ? null : (
          <Link href="/hiring">
            <Button size="xl" className="rounded-2xl text-base bg-neutral-950 hover:bg-neutral-950/90 dark:bg-white">
              Įdėti skelbimą - 5&euro;
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
