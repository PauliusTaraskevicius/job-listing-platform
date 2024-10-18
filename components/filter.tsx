"use client";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getJobs } from "@/actions/jobs";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Category, City } from "@prisma/client";

type Props = {
  categoriesData: Category[];
  citiesData: City[];
};

const Filter = ({ categoriesData, citiesData }: Props) => {
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openCity, setOpenCity] = useState<boolean>(false);

  const [valueCategory, setValueCategory] = useState<string>("");
  const [valueCity, setValueCity] = useState<string>("");

  const { data: jobsData, isLoading: loadingJobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const jobs = await getJobs();

      return jobs;
    },
  });

  const jobFilter = jobsData?.data.filter(
    (item) =>
      !!valueCategory && !!valueCity ? item.category.title === valueCategory && item.city.cityTitle === valueCity : 
      valueCategory ? item.category.title === valueCategory : valueCity ? item.city.cityTitle === valueCity : null
  );


  const isLoading = loadingJobs;

  if (isLoading) {
    return <Loader2 className="size-6 animate-spin" />;
  }

  return (
    <div>
      <Popover open={openCategory} onOpenChange={setOpenCategory}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCategory}
            className="w-[500px] justify-between"
          >
            {valueCategory
              ? categoriesData?.find(
                  (framework) => framework.title === valueCategory
                )?.title
              : "Kategorija"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0">
          <Command>
            <CommandInput placeholder="Kategorija" />
            <CommandEmpty>Kategorija nerasta.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {categoriesData?.map((framework) => (
                  <CommandItem
                    key={framework.title}
                    value={framework.title}
                    onSelect={(currentValue) => {
                      setValueCategory(
                        currentValue === valueCategory ? "" : currentValue
                      );
                      setOpenCategory(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        valueCategory === framework.title
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {framework.title}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openCity} onOpenChange={setOpenCity}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCity}
            className="w-[500px] justify-between"
          >
            {valueCity
              ? citiesData?.find(
                  (framework) => framework.cityTitle === valueCity
                )?.cityTitle
              : "Miestas"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0">
          <Command>
            <CommandInput placeholder="Miestas" />
            <CommandEmpty>Miestas nerastas.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {citiesData?.map((framework) => (
                  <CommandItem
                    key={framework.cityTitle}
                    value={framework.cityTitle}
                    onSelect={(currentValue) => {
                      setValueCity(
                        currentValue === valueCity ? "" : currentValue
                      );
                      setOpenCity(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        valueCity === framework.cityTitle
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {framework.cityTitle}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {!valueCategory && !valueCity ? jobsData?.data.map((job) => (
                <div key={job.id}>
                {job.category.title} {job.city.cityTitle} {job.title}
              </div>
      )): jobFilter?.map((job) => (
        <div key={job.id}>
          {job.category.title} {job.city.cityTitle} {job.title}
        </div>
      ))}

    </div>
  );
};

export default Filter;
