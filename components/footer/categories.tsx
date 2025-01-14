"use client";

import { getCategories } from "@/actions/category";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const Categories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories-feed", "categories"],
    queryFn: () => getCategories(),
  });

  return (
    <div className="flex flex-col gap-1">
      {data?.data.map((category) => (
        <Link key={category.id} href={`/kategorija/${category.slug}`}>
          <div className="">
            <p className="w-fit text-md text-muted-foreground transition-colors delay-0 hover:text-accent-foreground">
              {category.title.replace(/\//g, " ")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
