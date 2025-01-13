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

  const { cityTitle, slug } = data;

  try {
    const city: City = await db.city.create({
      data: {
        cityTitle,
        slug,
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
  try {
    const cities: City[] = await db.city.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        jobs: true,
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

export const getCityBySlug = async (slug: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }
  try {
    const city = await db.city.findUnique({
      where: { slug },
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

    return city;
  } catch (error) {
    console.log("[GET_CITY_BY_SLUG]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};
