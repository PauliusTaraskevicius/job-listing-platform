"use server";

import { auth } from "@clerk/nextjs/server";
import { categoryType } from "./validation";
import { db } from "@/db";
import { NextResponse } from "next/server";
import { Category } from "@prisma/client";

export const createCategory = async (
  data: categoryType
): Promise<categoryType> => {
  const { userId: user } = auth();

  if (!user) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  const { title } = data;

  try {
    const categoryPost: Category = await db.category.create({
      data: {
        title,
        userId: user,
      },
    });

    return categoryPost;
  } catch (error) {
    console.log("[CREATE_CATEGORY]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};
