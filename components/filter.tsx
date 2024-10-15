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

type Props = {
  categoriesData: Category[];
  citiesData: City[];
};

const Filter = ({ categoriesData, citiesData }: Props) => {
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");

  const { data: jobsData, isLoading: loadingJobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const jobs = await getJobs();

      return jobs;
    },
  });

  const jobFilter = jobsData?.data.filter(
    (item) =>
      item.category.title === categoryInput || item.city.cityTitle === cityInput
  );

  const isLoading = loadingJobs;

  const jobOptions = jobsData?.data.map((job) => ({
    value: job.id,
    label: job.title,
    category: job.category.title,
    city: job.city.cityTitle,
  }));

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-2">
        <Select
          value={categoryInput}
          onValueChange={(value) => {
            setCategoryInput(value);
          }}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              <ListChecks className="size-4 mr-2" />
              <SelectValue placeholder="Kategorijos" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Kategorijos</SelectItem>
            <SelectSeparator />
            {categoriesData.map((category) => (
              <SelectItem key={category.id} value={category.title}>
                {category.title}
              </SelectItem>
            ))}


          </SelectContent>
        </Select>
      </div>
      {/* <div className="flex space-x-4">
        <Select
          value={categoryInput}
          onValueChange={(value) => {
            setCategoryInput(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kategorija" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categoriesData.map((category) => (
                <SelectItem key={category.id} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={cityInput}
          onValueChange={(value) => {
            setCityInput(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder='Miestas' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {citiesData.map((city) => (
                <SelectItem key={city.id} value={city.cityTitle}>
                  {city.cityTitle}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {!categoryInput &&
        !cityInput &&
        jobsData?.data.map((job) => (
          <div key={job.id}>
            {job.category.title} {job.city.cityTitle} {job.title}
          </div>
        ))}

      {jobFilter?.map((job) => (
        <div key={job.id}>
          {job.category.title} {job.city.cityTitle} {job.title}
        </div>
      ))} */}
    </div>
  );
};

export default Filter;
