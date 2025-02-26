import Link from "next/link";

import { UserButton } from "@clerk/nextjs";

import { LuBriefcaseBusiness } from "react-icons/lu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";

import { MobileNavigation } from "@/components/navigation/mobile-navigation";

import CreateListingButton from "@/components/PREMIUM/create-listing-button";
import { canCreateJobListing } from "@/components/PREMIUM/permissions";
import { getUserSubscriptionLevel } from "@/components/PREMIUM/subscriptions";
import { AdminMobileNavigation } from "./admin-mobile-navigation";

export const AdminNavigation = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [listings, totalCount, subscriptionLevel] = await Promise.all([
    db.job.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        author: true,
        category: true,
        city: true,
        bookmarks: true,
      },
    }),
    db.job.count({
      where: {
        authorId: userId,
      },
    }),
    getUserSubscriptionLevel(userId),
  ]);

  return (
    <>
      <div className="flex lg:hidden justify-between items-center w-full sticky inset-x-0 top-0 h-[6rem] px-2 bg-white dark:bg-background transition-all z-10">
        <AdminMobileNavigation />
      </div>
      <div className="hidden lg:flex justify-between items-center w-full sticky inset-x-0 top-0 h-[6rem] px-2 bg-white dark:bg-background transition-all z-10">
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

          <CreateListingButton
            canCreate={canCreateJobListing(subscriptionLevel, totalCount)}
          />
        </div>
      </div>
    </>
  );
};
