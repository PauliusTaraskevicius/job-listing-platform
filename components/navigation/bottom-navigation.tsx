"use client";

import Link from "next/link";

import { LuBriefcaseBusiness } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { FaRegFile } from "react-icons/fa";
import { LuFileCheck } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationLinks = [
  {
    label: "Pagrindinis",
    href: "/",
    icon: <LuBriefcaseBusiness className="size-6" />,
  },
  {
    label: "Profilis",
    href: "/profilis/user-profile",
    icon: <FiUser className="size-6"/>,
  },
  {
    label: "Mano skelbimai",
    href: "/skelbimai",
    icon: <FaRegFile className="size-6" />,
  },
  {
    label: "Išsaugoti skelbimai",
    href: "/issaugoti_skelbimai",
    icon: <LuFileCheck className="size-6" />,
  },
  {
    label: "Nustatymai",
    href: "/nustatymai",
    icon: <LuSettings className="size-6" />,
  },
];

export const BottomNavigation = () => {
  const activePath = usePathname();

  return (
    <div className="fixed flex justify-center items-center md:hidden bottom-0 left-0 w-full p-2 border border-muted-foreground/20 bg-white">
      {navigationLinks.map((link) => (
        <Button
          className={cn(
            "flex justify-center px-6 bg-red-100 rounded-full bg-transparent hover:bg-primary transition text-primary hover:text-white hover:dark:text-black",
            activePath === link.href && "bg-primary text-white dark:text-black"
          )}
          key={link.href}
          asChild
        >
          <Link href={link.href}>
            {" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{link.icon}</TooltipTrigger>
                <TooltipContent>
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </Button>
      ))}
    </div>
  );
};
