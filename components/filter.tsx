"use client";
import { useState } from "react";

import { getCategoriesWithJobs } from "@/actions/category";
import { Category, Job } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  categoriesData: Category[];
};

const Filter = ({ categoriesData }: Props) => {
  const [categoryInput, setCategoryInput] = useState<string>("");

  const { data: jobs } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = await getCategoriesWithJobs(categoryInput);

      return categories;
    },
  });

  return (
    <div>
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
      {!categoryInput &&
        jobs?.data.map((job) => (
          <>
            {job.jobs.map((item, i) => (
              <div key={i}>
                {item.category.title} {item.title}
              </div>
            ))}
          </>
        ))}

      {jobs?.data.map((job) => (
        <>
          {job.jobs
            .filter((item) => {
              return item.category.title === categoryInput;
            })
            .map((job) => (
              <div key={job.categoryId}>
                {job.category.title} {job.title}
              </div>
            ))}
        </>
      ))}
      <p className="font-extrabold">{categoryInput}</p>
    </div>
  );
};

export default Filter;
