"use client";

import { getCities } from "@/actions/city";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const Cities = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cities-feed", "cities"],
    queryFn: () => getCities(),
  });

  return (
    <div className="flex flex-col gap-1">
      {data?.data.map((city) => (
        <Link key={city.id} href={`/miestas/${city.slug}`}>
          <div className="">
            <p className="w-fit text-md text-muted-foreground transition-colors delay-0 hover:text-accent-foreground">{city.cityTitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
