"use client";
import { useState } from "react";

import { Category, City } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getJobs } from "@/actions/jobs";
import { ListChecks } from "lucide-react";

import { Check, ChevronsUpDown } from "lucide-react";

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

type Props = {
  categoriesData: Category[];
  citiesData: City[];
};

const Filter = ({ categoriesData, citiesData }: Props) => {
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const { data: jobsData, isLoading: loadingJobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const jobs = await getJobs();

      return jobs;
    },
  });

  const jobFilter = jobsData?.data.filter(
    (item) => item.category.title === value || item.city.cityTitle === value
  );

  const isLoading = loadingJobs;

  const jobOptions = jobsData?.data.map((job) => ({
    value: job.category.title,
    label: job.title,
    category: job.category.title,
    city: job.city.cityTitle,
  }));

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[500px] justify-between"
          >
            {value
              ? jobOptions?.find((framework) => framework.value === value)
                  ?.category
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
                {jobOptions?.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.category}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {jobFilter?.map((job) => (
        <div key={job.id}>
          {job.category.title} {job.city.cityTitle} {job.title}
        </div>
      ))}
    </div>
  );
};

export default Filter;
