"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/db";
import { NextResponse } from "next/server";
import { categoryType } from "./type";
import { Category } from "@prisma/client";

export const createCategory = async (data: categoryType) => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  const { title } = data;

  try {
    const category: Category = await db.category.create({
      data: {
        title,
        creatorId: userId,
      },
    });

    return { data: category };
  } catch (error) {
    console.log("[CREATE_CATEGORY]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const getCategories = async () => {
  try {
    const categories: Category[] = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        jobs: true,
      },
    });

    return { data: categories };
  } catch (error) {
    console.log("[GET_CATEGORIES]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const getCategoryBySlug = async (title: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }
  try {
    const category = await db.category.findUnique({
      where: { title },
      include: {
        jobs: {
          include: {
            author: true,
            bookmarks: {
              where: {
                authorId: userId,
              },
            },
            category: true,
            city: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        creator: true,
      },
    });

    return category;
  } catch (error) {
    console.log("[GET_CATEGORY_BY_SLUG]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};
