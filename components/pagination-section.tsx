"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Job } from "@/lib/types";
import { Jobs } from "./jobs/jobs";

type Props = {
  jobsData: Job[];
};

export const PaginationSection = ({ jobsData }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const data = jobsData;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);
  const totalItems = data.length;

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {currentItems.map((job) => (
        <div key={job.title} className="w-full py-1.5 cursor-pointer">
          <Link href={`/job/${job.id}`}>
            <Jobs job={job} />
          </Link>
        </div>
      ))}
      <Pagination className="py-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePrevPage()}
            />
          </PaginationItem>
          {pages.map((page, i) => (
            <PaginationItem
              key={i}
              className={
                currentPage === page ? "bg-neutral-200 rounded-md" : ""
              }
            >
              <PaginationLink
                className="cursor-pointer"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => handleNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
