"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/db";
import { NextResponse } from "next/server";
import { jobType } from "./type";
import { Job } from "@prisma/client";

export const createJob = async (data: jobType) => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  const { title, company, description, applyUrl, remote, cityId, categoryId, premium } =
    data;

  try {
    const job: Job = await db.job.create({
      data: {
        title,
        company,
        description,
        applyUrl,
        remote,
        premium,
        cityId,
        categoryId,
        authorId: userId
      },
    });

    return { data: job };
  } catch (error) {
    console.log("[CREATE_JOB]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const getJobs = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  try {
    const jobs: Job[] = await db.job.findMany({
      where: { authorId: userId },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        city: true
      }
    });

    return { data: jobs };
  } catch (error) {
    console.log("[GET_JOBS]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};


