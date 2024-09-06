"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/db";
import { NextResponse } from "next/server";
import { categoryType } from "./type";
import { Category } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
