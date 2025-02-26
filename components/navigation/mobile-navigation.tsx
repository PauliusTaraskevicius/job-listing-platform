import Link from "next/link";

import { Button } from "../ui/button";
import { useAuth, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

export const MobileNavigation = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-row justify-between items-center sticky top-0 p-2.5 backdrop-blur-lg transition-all z-50">
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
      {!isSignedIn && (
        <div className="flex space-x-2">
          <Link href="/sign-in" className="flex items-center justify-center">
            <Button
              size="default"
              className="rounded-2xl text-sm bg-neutral-950 hover:bg-neutral-950/90"
            >
              <User className="size-4 mr-1" />
              Prisijungimas
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
