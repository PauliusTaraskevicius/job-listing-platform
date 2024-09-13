"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/db";
import { NextResponse } from "next/server";
import { cityType } from "./type";
import { Category, City } from "@prisma/client";

export const createCity = async (data: cityType) => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  const { cityTitle } = data;

  try {
    const city: City = await db.city.create({
      data: {
        cityTitle,
        creatorId: userId,
      },
    });

    return { data: city };
  } catch (error) {
    console.log("[CREATE_CITY]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const getCities = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  try {
    const cities: City[] = await db.city.findMany({
      where: { creatorId: userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: cities };
  } catch (error) {
    console.log("[GET_CITIES]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};
