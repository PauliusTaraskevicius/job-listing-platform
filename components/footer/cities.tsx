"use client";

import Link from "next/link";

import { City } from "@prisma/client";

type Props = {
  cities: City[];
};

export const Cities = ({ cities }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {cities.map((city) => (
        <Link key={city.id} href={`/miestas/${city.slug}`}>
          <div className="">
            <p className="w-fit text-md text-muted-foreground transition-colors delay-0 hover:text-accent-foreground">
              {city.cityTitle}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
