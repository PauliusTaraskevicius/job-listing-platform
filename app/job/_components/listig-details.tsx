"use client";

import { usePathname } from "next/navigation";

import { Category, City, Job, User } from "@prisma/client";

import { format } from "date-fns";

import Link from "next/link";

import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaArrowLeft, FaLinkedin } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";

import { useToast } from "@/components/ui/use-toast";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import RichTextRenderer from "@/components/rich-text-field/rich-text-renderer";
import { Button } from "@/components/ui/button";

type ListingDetailsProps = {
  job: Job & {
    category: Category;
    city: City;
    author: User;
  };
};

const socials = [
  {
    icon: <FaXTwitter className="size-4" />,
    href: "",
  },
  {
    icon: <FaLinkedin className="size-4" />,
    href: "",
  },
  {
    icon: <FaFacebook className="size-4" />,
    href: "",
  },
];

export const ListingDetails = ({ job }: ListingDetailsProps) => {
  const { title, createdAt, company, city, description, remote, applyUrl } =
    job;

  const route = usePathname();
  const { toast } = useToast();

  const formatDate = format(createdAt, "MM/dd/yyyy");

  const baseUrl = "http://localhost:3000";
  const copyLink = () => {
    navigator.clipboard.writeText(baseUrl + route);
    toast({
      title: "Nuoroda nukopijuota",
    });
  };

  return (
    <div className="w-full">
      <div className="p-4 xl:p-0 flex flex-col space-y-3">
        <Link
          href="/"
          className="flex items-center space-x-4 mb-4 hover:underline"
        >
          <FaArrowLeft className="size-4 mr-3" />
          Grįžti į skelbimus
        </Link>
        <span className="uppercase text-muted-foreground">
          Skelbimo data - {formatDate}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        <p>
          {company} ⋅ {city.cityTitle}
        </p>
        <div className="flex items-center space-x-3">
          <p className="text-muted-foreground">Pasidalinkite: </p>
          {socials.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.icon}
            </Link>
          ))}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div onClick={copyLink}>
                  <FaCopy className="size-4 cursor-pointer" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Kopijuoti nuorodą</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {remote && <p>Darbo skelbimo pozicijai galimas nuotolinis darbas.</p>}
      </div>
      <div className="py-3">
        <RichTextRenderer description={description} />
      </div>
      <div className="p-4 lg:p-0">
      <Link href={applyUrl} >
        <Button className="w-full my-3">Aplikuoti</Button>
      </Link>
      </div>
    </div>
  );
};
