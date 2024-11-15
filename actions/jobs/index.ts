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

  const {
    title,
    company,
    description,
    applyUrl,
    remote,
    cityId,
    categoryId,
    premium,
    paymentMethod,
    salary,
  } = data;

  try {
    const job: Job = await db.job.create({
      data: {
        title,
        company,
        description,
        applyUrl,
        remote,
        premium,
        paymentMethod,
        salary,
        cityId,
        categoryId,
        authorId: userId,
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
  try {
    const jobs = await db.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        city: true,
      },
    });

    return { data: jobs };
  } catch (error) {
    console.log("[GET_JOBS]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const getUserJobs = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  try {
    const jobs = await db.job.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        city: true,
      },
    });

    return { data: jobs };
  } catch (error) {
    console.log("[GET_USER_JOBS]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const deleteJobListing = async (id: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  try {
    const job = await db.job.findUnique({
      where: { id },
    });

    if (!job) throw new NextResponse("Skelbimas nerastas", { status: 401 });

    if (job.authorId !== userId)
      throw new NextResponse("Skelbimą ištrinti gali tik autorius.", {
        status: 401,
      });

    const deleteJob = await db.job.delete({
      where: { id },
    });

    return deleteJob;
  } catch (error) {
    console.log("[DELETE_JOB_LISTING]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};
