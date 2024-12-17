"use client";

import { JobProps } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import DeleteJobDialog from "../delete-job-dialog";
import { useState } from "react";
import Link from "next/link";

export const columns: ColumnDef<JobProps>[] = [
  {
    accessorKey: "title",
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
    accessorFn: (row) => row.category.title,
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
    accessorFn: (row) => row.city.cityTitle,
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
      const salary = row.original;

      const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Meniu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/skelbimai/${salary.id}`}>
                  <div className="flex items-center cursor-pointer">
                    <Pencil className="size-4 mr-1" />
                    Redaguoti
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                <div className="flex items-center cursor-pointer">
                  <Trash className="size-4 mr-1" />
                  Ištrinti
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteJobDialog
            job={salary}
            open={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
          />
        </>
      );
    },
  },
];
