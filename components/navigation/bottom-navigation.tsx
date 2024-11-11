"use client";

import Link from "next/link";

import {
  File,
  FileCheck,
  House,
  Settings,
  BriefcaseBusiness,
} from "lucide-react";

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
    icon: <BriefcaseBusiness />,
  },
  {
    label: "Profilis",
    href: "/profilis",
    icon: <House />,
  },
  {
    label: "Mano skelbimai",
    href: "/skelbimai",
    icon: <File />,
  },
  {
    label: "Išsaugoti skelbimai",
    href: "/issaugoti_skelbimai",
    icon: <FileCheck />,
  },
  {
    label: "Nustatymai",
    href: "/nustatymai",
    icon: <Settings />,
  },
];

export const BottomNavigation = () => {
  const activePath = usePathname();

  return (
    <div className="fixed flex justify-center items-center md:hidden bottom-0 left-0 w-full p-2 border border-muted-foreground/20 px-4 bg-white">
      {navigationLinks.map((link) => (
        <Button
          className={cn(
            "flex justify-center gap-2 rounded-full bg-transparent hover:bg-primary transition text-primary hover:text-white hover:dark:text-black",
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
