"use client";

import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import {
  BriefcaseBusiness,
  File,
  FileCheck,
  House,
  Loader2,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";

const navigationLinks = [
  {
    label: "Pagrindinis",
    href: "/pagrindinis",
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

export const SidebarNavigation = () => {
  const activePath = usePathname();

  return (
    <aside className="sticky left-0 top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80 rounded-2xl border border-muted-foreground/20 px-4">
      <div>
        <Link href="/" className="flex justify-center items-center p-4 gap-2">
          <BriefcaseBusiness className="size-11 text-neutral-950 dark:text-white" />
          <span className="uppercase font-semibold text-lg">DarbasMan</span>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="w-[90%]" />
      </div>
      <div className="flex flex-col justify-center items-start gap-2">
        {navigationLinks.map((link) => (
          <Button
            className={cn(
              "flex justify-start gap-2 rounded-full p-6 bg-transparent hover:bg-primary transition text-primary hover:text-white w-full hover:dark:text-black",
              activePath === link.href && "bg-primary text-white dark:text-black"
            )}
            key={link.href}
            asChild
          >
            <Link href={link.href}>
              {link.icon}
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center p-6">
        <ModeToggle />
      </div>
    </aside>
  );
};
