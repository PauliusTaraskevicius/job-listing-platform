"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/actions/jobs";
import { Check, ChevronsUpDown, SearchIcon, X, XIcon } from "lucide-react";
import { Category, City } from "@prisma/client";
import { cn } from "@/lib/utils";

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
import {
  PaginationDataPlaceholder,
  PaginationSection,
} from "./pagination-section";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

type Props = {
  categoriesData: Category[];
  citiesData: City[];
};

const Filter = ({ categoriesData, citiesData }: Props) => {
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openCity, setOpenCity] = useState<boolean>(false);

  const [valueCategory, setValueCategory] = useState<string>("");
  const [valueCity, setValueCity] = useState<string>("");

  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current?.blur();
  };

  const router = useRouter();

  const { data: jobsData, isLoading: loadingJobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const jobs = await getJobs();

      return jobs;
    },
  });

  const jobFilter = jobsData?.data.filter((item) =>
    !!valueCategory && !!valueCity
      ? item.category.title === valueCategory &&
        item.city.cityTitle === valueCity
      : valueCategory
      ? item.category.title === valueCategory
      : valueCity
      ? item.city.cityTitle === valueCity
      : null
  );

  const isLoading = loadingJobs;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/paieska?q=${encodeURIComponent(q)}`);
  };

  if (isLoading) {
    return (
      <>
        <PaginationDataPlaceholder />
        <PaginationDataPlaceholder />
        <PaginationDataPlaceholder />
        <PaginationDataPlaceholder />
        <PaginationDataPlaceholder />
      </>
    );
  }

  return (
    <div className="w-full py-1.5">
      <div className="flex space-x-2">
        <Popover open={openCategory} onOpenChange={setOpenCategory}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCategory}
              className="shadow-md"
            >
              {valueCategory
                ? categoriesData?.find(
                    (framework) => framework.title === valueCategory
                  )?.title
                : "Kategorija"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
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
              className="shadow-md"
            >
              {valueCity
                ? citiesData?.find(
                    (framework) => framework.cityTitle === valueCity
                  )?.cityTitle
                : "Miestas"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
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
        <form
          onSubmit={handleSubmit}
          method="GET"
          action="/search"
          className="w-1/2"
        >
          <div className="relative">
            <Input
              value={value}
              onChange={handleChange}
              ref={inputRef}
              name="q"
              placeholder="Paieška"
              className="px-14"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute left-3 top-1/2 size-5 -translate-y-1/2 transform"
            >
              <SearchIcon className=" text-muted-foreground" />
            </Button>
            {value && (
              <>
                <Button
                  onClick={handleClear}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform"
                >
                  <XIcon className=" text-muted-foreground" />
                </Button>
              </>
            )}
          </div>
        </form>
      </div>

      <PaginationSection
        jobsData={!valueCategory && !valueCity ? jobsData?.data : jobFilter}
        itemsPerPageNumber={20}
      />
    </div>
  );
};

export default Filter;
