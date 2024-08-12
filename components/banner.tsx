"use client";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

export const Banner = () => {
  return (
    <div className="flex justify-center items-center w-full py-2">
      <div className="flex flex-col justify-center items-center space-y-6">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="max-w-5xl text-center text-4xl text-neutral-950 font-bold uppercase antialiased sm:text-5xl lg:text-7xl">
            Atrask darbo pasiūlymus
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base antialiased">
            Rask darbo pasiūlymą savo mieste jau šiandien.
          </p>
          <p className="italic text-muted-foreground">
            &apos;Lietuviškasis craigslist&apos;
          </p>
        </div>

        <div className="flex items-center w-full max-w-md space-x-2">
          <Input placeholder="Gauk naujausius darbo pasiūlymus el.paštu" />
          <Button className="font-bold bg-neutral-950 hover:bg-neutral-950/90">
            Prenumeruoti
          </Button>
        </div>
      </div>
    </div>
  );
};
