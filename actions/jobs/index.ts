"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/db";
import { NextResponse } from "next/server";
import { jobType } from "./type";
import { Job } from "@prisma/client";
import { createJobSchema } from "./validation";
import { BookmarkInfo } from "@/lib/types";
import { revalidatePath } from "next/cache";


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
        bookmarks: true,
        author: true,
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

export const getJobById = async (id: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }
  try {
    const job = await db.job.findUnique({
      where: { id },
      include: {
        category: true,
        city: true,
        bookmarks: {
          where: {
            authorId: userId,
          },
        },
        author: true,
      },
    });

    return job;
  } catch (error) {
    console.log("[GET_JOB_BY_ID]", error);
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
        author: true,
        bookmarks: true,
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
      include: {
        bookmarks: true,
      },
    });

    return deleteJob;
  } catch (error) {
    console.log("[DELETE_JOB_LISTING]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const editJobListing = async (id: string, values: jobType) => {
  const validatedValues = createJobSchema.parse(values);

  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  try {
    const updatedJob = await db.$transaction(async (tx) => {
      const updatedJob = await tx.job.update({
        where: { id: id },
        data: validatedValues,
        include: {
          category: true,
          city: true,
        },
      });

      return updatedJob;
    });

    return updatedJob;
  } catch (error) {
    console.log("[EDIT_JOB_LISTING]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const createBookmark = async (jobId: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new NextResponse("Vartotojas nerastas", { status: 401 });
    }

    const bookmark = await db.bookmark.upsert({
      where: {
        authorId_jobId: {
          authorId: userId,
          jobId,
        },
      },
      create: {
        authorId: userId,
        jobId,
      },
      update: {},
    });

    const data: BookmarkInfo = {
      isBookmarkedByUser: !!bookmark,
    };

    revalidatePath("/issaugoti_skelbimai");

    return data;
  } catch (error) {
    console.log("[CREATE_BOOKMARK]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const deleteBookmark = async (jobId: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new NextResponse("Vartotojas nerastas", { status: 401 });
    }

    const deleteBookmark = await db.bookmark.deleteMany({
      where: {
        authorId: userId,
        jobId,
      },
    });

    revalidatePath("/issaugoti_skelbimai");

    return deleteBookmark;
  } catch (error) {
    console.log("[DELETE_BOOKMARK]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const getUserJobsWithBookmarks = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Vartotojas nerastas", { status: 401 });
  }

  try {
    const bookmarks = await db.bookmark.findMany({
      where: {
        authorId: userId,
      },
      include: {
        job: {
          include: {
            category: true,
            city: true,
            bookmarks: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return bookmarks;
  } catch (error) {
    console.log("[GET_USER_JOBS_WITH_BOOKMARKS]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};

export const search = async (name: string) => {
  try {
    // const q = req.nextUrl.searchParams.get("q") || "";

    const searchQuery = name.split(" ").join(" & ");

    const searchData = await db.job.findMany({
      where: {
        OR: [
          {
            title: {
              search: searchQuery,
            },
          },
          {
            description: {
              search: searchQuery,
            },
          },
          {
            company: {
              search: searchQuery,
            },
          },
          {
            category: {
              title: {
                search: searchQuery,
              },
            },
          },
          {
            city: {
              cityTitle: {
                search: searchQuery,
              },
            },
          },
        ],
      },
      include: {
        category: true,
        city: true,
        bookmarks: true,
        author: true,
      },
    });

    return searchData;
  } catch (error) {
    console.log("[SEARCH]", error);
    throw new NextResponse("Įvyko klaida. Bandykite dar kartą.", {
      status: 500,
    });
  }
};
