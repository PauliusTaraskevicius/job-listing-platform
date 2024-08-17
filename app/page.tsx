"use client";
import { useState } from "react";

import { Banner } from "@/components/banner";
import { Jobs } from "@/components/jobs/jobs";
import { PaginationSection } from "@/components/pagination-section";

import { DUMMY_DATA } from "@/DUMMY_DATA";
import Link from "next/link";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const data = DUMMY_DATA;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Banner />
      {currentItems.map((job) => (
        <div key={job.title} className="w-full py-1.5 cursor-pointer">
          <Link href={`/job/${job.id}`}>
            <Jobs job={job} />
          </Link>
        </div>
      ))}
      <PaginationSection
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
