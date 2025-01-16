"use client";

import { Category } from "@prisma/client";
import Link from "next/link";

type Props = {
  categories: Category[];
};

export const Categories = ({ categories }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {categories.map((category) => (
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
