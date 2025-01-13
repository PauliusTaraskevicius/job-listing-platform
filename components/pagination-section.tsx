"use client";

import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Jobs } from "./jobs/jobs";
import { Skeleton } from "./ui/skeleton";
import { JobProps } from "@/lib/types";
import { Bookmark, Category, City } from "@prisma/client";
import Link from "next/link";

type Props = {
  jobsData: JobProps[] & {
    category: Category;
    city: City;
    bookmark: Bookmark;
  };
  itemsPerPageNumber: number;
};

export const PaginationSection = ({ jobsData, itemsPerPageNumber }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const data = jobsData;

  const lastItemIndex = currentPage * itemsPerPageNumber;
  const firstItemIndex = lastItemIndex - itemsPerPageNumber;
  const currentItems = data?.slice(firstItemIndex, lastItemIndex);
  const totalItems = data?.length;

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPageNumber); i++) {
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

  if (!currentItems || !pages) {
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
    <>
      {currentItems.map((job) => (
        <div
          key={job.title}
          className="w-full py-1.5 cursor-pointer lg:px-0 px-1 "
        >
          <Link href={`job/${job.id}`}>
            <Jobs job={job} />
          </Link>
        </div>
      ))}

      {currentItems.length === 0 && (
        <div className="flex justify-center items-center w-full py-1.5 cursor-pointer lg:px-0 px-1">
          <h1>Skelbimų nerasta.</h1>
        </div>
      )}

      {currentItems.length >= 5 && (
        <Pagination className="py-2">
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
                  className="cursor-pointer dark:text-black"
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
      )}
    </>
  );
};

export const PaginationDataPlaceholder = () => {
  return (
    <div className="w-full p-2">
      <div className="flex flex-col">
        <Skeleton className="flex justify-between h-[130px] lg:h-[170px] border border-zinc-200 dark:border-0  overflow-hidden">
          <div>
            <Skeleton className="w-[200px] h-[20px] lg:w-[500px] lg:h-[30px] m-4 bg-zinc-200" />
            <Skeleton className="w-[150px] h-[20px] lg:w-[300px] lg:h-[30px] m-4 bg-zinc-200" />
            <Skeleton className="w-[100px] h-[20px] lg:w-[200px] lg:h-[30px] m-4 bg-zinc-200" />
          </div>
          <div className="flex justify-center items-center p-4 space-x-4">
            <Skeleton className="w-[30px] lg:w-10 h-5 border rounded-xl bg-zinc-200" />
            <Skeleton className="w-[30px] lg:w-10 h-5  border rounded-xl bg-zinc-200" />
            <Skeleton className="w-[30px] lg:w-10 h-5  border rounded-xl bg-zinc-200" />
            <Skeleton className="w-[30px] lg:w-10 h-5  border rounded-xl bg-zinc-200" />
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
