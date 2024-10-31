"use client";

import { Input } from "@/components/ui/input";
import { List, Search, LayoutGrid } from "lucide-react";

import { lt } from "date-fns/locale";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { JobProps } from "@/lib/types";
import { useState } from "react";
import ListView from "./card-view";
import CardView from "./list-view";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  jobs: JobProps[];
};

export const DataView = ({ jobs }: Props) => {
  const [view, setView] = useState<string>("list");

  return (
    <div className="w-full pl-4">
      {" "}
      <div className="flex justify-between items-center p-4 rounded-2xl border border-muted-foreground/20">
        <div className="flex w-full items-center gap-3">
          <div className="flex items-center relative w-3/4">
            <Input placeholder="Paieška..." />
            <Search className="size-5 absolute right-3 text-muted-foreground z-10" />
          </div>
          <div className="text-muted-foreground">
            {format(new Date(), "yyyy. MMMM d", { locale: lt })}
          </div>
        </div>

        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-2xl"
                  onClick={() => setView("card")}
                  variant={view === "list" ? "outline" : "default"}
                >
                  <LayoutGrid className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Kortelės</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={view === "card" ? "outline" : "default"}
                  className="rounded-2xl"
                  onClick={() => setView("list")}
                >
                  <List className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sąrašas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {view === "list" && <ListView data={jobs} />}
      {view === "card" && <CardView data={jobs} />}
    </div>
  );
};
