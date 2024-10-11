"use client";
import { useState } from "react";

import { Category, City, Job } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getJobs } from "@/actions/jobs";

type Props = {
  categoriesData: Category[];
  citiesData: City[];
};

const Filter = ({ categoriesData, citiesData }: Props) => {
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");

  const { data: jobsData } = useQuery({
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

  

  return (
    <div>
      <div className="flex space-x-4">
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
            <SelectValue placeholder="Miestas" />
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
      ))}
    </div>
  );
};

export default Filter;
