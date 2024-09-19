"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Category, City, Job } from "@prisma/client";

type Props = {
  job: Job & {
    category: Category;
    city: City;
  };
};

export const Jobs = ({ job }: Props) => {
  const { company, title, category, city, premium, remote } = job;

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-normal text-base leading-none tracking-wide">
          {company}
        </CardTitle>
        <CardDescription className="flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl text-black dark:text-white font-semibold leading-none tracking-tight">
                {title}
              </h1>
            </div>
            {/* <div className="flex space-x-1">
              {tags.map((tag) => (
                <div key={tag} className="">
                  <Badge className="cursor-pointer">{tag}</Badge>
                </div>
              ))}
            </div> */}
            <div className="flex space-x-1">
              <div className="">
                {remote === false ? (
                  <Badge className="cursor-pointer">No remote</Badge>
                ) : (
                  <Badge className="cursor-pointer">Darbas iš namų</Badge>
                )}
              </div>
            </div>
          </div>
          <span className="font-normal text-muted-foreground  text-base leading-none tracking-normal">
            {category.title}
          </span>
          <span className="font-normal text-muted-foreground  text-base leading-none tracking-normal">
            {city.cityTitle}
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
