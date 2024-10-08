"use client";

import {  getCategoriesWithJobs } from "@/actions/category";
import { Category, Job } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";



const Filter = () => {
  const { data: jobs } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = await getCategoriesWithJobs('informatika')

      return categories
    }
  });


  return (
    <div>
      {jobs?.data.map((job) => (
        <>
          {job.jobs.map((item) => (
            <div key={item.id}>
              {item.category.title}  {item.title}
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default Filter;
