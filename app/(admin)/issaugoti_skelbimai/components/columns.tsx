"use client";

import { UserBookmarkedJobs } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import BookmarkButton from "@/components/jobs/bookmark-button";

import { useAuth } from "@clerk/nextjs";

export const columns: ColumnDef<UserBookmarkedJobs>[] = [
  {
    accessorKey: "title",
    accessorFn: (row) => row.job.title,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pavadinimas
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "salary",
    accessorFn: (row) => row.job.salary,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Atlyginimas
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("salary")}&#8364;
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    accessorFn: (row) => row.job.category.title,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategorija
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "city",
    accessorFn: (row) => row.job.city.cityTitle,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Miestas
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("city")}</div>
    ),
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const { userId } = useAuth();
      const bookmark = row.original;

      return (
        <>
          <BookmarkButton
            initialState={{
              isBookmarkedByUser: bookmark.job.bookmarks.some(
                (bookmark) => bookmark.authorId === userId
              ),
            }}
            jobId={bookmark.job.id}
          />
        </>
      );
    },
  },
];
