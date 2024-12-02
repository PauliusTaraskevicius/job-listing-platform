"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";

import { JobProps } from "@/lib/types";
import BookmarkButton from "./bookmark-button";

type Props = {
  job: JobProps;
};

export const Jobs = ({ job }: Props) => {
  const {
    company,
    title,
    category,
    city,
    premium,
    remote,
    salary,
    paymentMethod,
  } = job;

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { user, isSignedIn } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        
        <CardTitle className="font-normal text-sm lg:text-base leading-none tracking-wide">
          {company}
        </CardTitle>
        <CardDescription className="flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <div className="">
              <div>
                <h1 className="lg:text-xl text-black dark:text-white font-semibold leading-none tracking-tight py-1">
                  {title}
                </h1>
                <div className="flex space-x-2">
                  <span className="font-normal text-muted-foreground  lg:text-base leading-none tracking-normal">
                    {category.title},
                  </span>
                  <span className="font-normal text-muted-foreground  lg:text-base leading-none tracking-normal">
                    {city.cityTitle}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:space-y-0 space-y-2 space-x-2">
                <div>
                  {remote && (
                    <Badge className="cursor-pointer">Darbas iš namų</Badge>
                  )}
                </div>

                <div className="flex flex-col justify-center items-center space-y-1">
                  <Badge className="cursor-pointer">{salary} &euro;/mėn </Badge>
                  <div>
                    <span>
                      {" "}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {paymentMethod === "BRUTO" ? (
                              <p className="hover:bg-foreground/10 rounded-lg px-1 transition">
                                Bruto
                              </p>
                            ) : (
                              <p className="hover:bg-foreground/10 rounded-lg px-1 transition">
                                Neto
                              </p>
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {paymentMethod === "BRUTO"
                                ? "Neatskaičius mokesčių"
                                : "Į rankas"}{" "}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </div>
                </div> 
              </div>
              {isSignedIn && (
                <BookmarkButton
                  jobId={job.id}
                  initialState={{
                    isBookmarkedByUser: job.bookmarks.some(
                      (bookmark) => bookmark.authorId === user?.id
                    ),
                  }}
                />
              )}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
