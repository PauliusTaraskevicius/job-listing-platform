"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/db";
import { categoryType } from "./type";
import { Category } from "@prisma/client";

export const createCategory = async (data: categoryType) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Vartotojas nerastas");
  }

  const { title, slug } = data;

  try {
    const category: Category = await db.category.create({
      data: {
        title,
        slug: slug.replace(/\//g, "_"),
        creatorId: userId,
      },
    });

    return { data: category };
  } catch (error) {
    console.log("[CREATE_CATEGORY]", error);
    throw new Error("Įvyko klaida. Bandykite dar kartą.");
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
    throw new Error("Įvyko klaida. Bandykite dar kartą.");
  }
};

export const getCategoryBySlug = async (slug: string) => {
  const { userId } = auth();

  try {
    const category = await db.category.findUnique({
      where: { slug },
      include: {
        jobs: {
          include: {
            author: true,
            bookmarks: userId
              ? {
                  where: {
                    authorId: userId,
                  },
                }
              : false,
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
    throw new Error("Įvyko klaida. Bandykite dar kartą.");
  }
};
