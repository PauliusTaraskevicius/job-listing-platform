import Link from "next/link";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { getUserSubscriptionLevel } from "@/components/PREMIUM/subscriptions";
import CreateListingButton from "@/components/PREMIUM/create-listing-button";
import { canCreateJobListing } from "@/components/PREMIUM/permissions";

export const AdminMobileNavigation = async () => {
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
    <div className="flex flex-row justify-between w-full items-center sticky top-0 p-2.5 backdrop-blur-lg transition-all z-50">
      <div className="flex space-x-4">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="font-normal border-none"
        >
          <UserButton
            appearance={{ elements: { avatarBox: "size-9" } }}
            userProfileUrl="/profilis/user-profile"
            userProfileMode="navigation"
          />
        </Button>
      </div>
      <div className="flex space-x-2">
        <CreateListingButton
          canCreate={canCreateJobListing(subscriptionLevel, totalCount)}
        />
      </div>
    </div>
  );
};
