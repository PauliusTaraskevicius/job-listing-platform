"use server";

import { DUMMY_DATA } from "@/DUMMY_DATA";
import { Job } from "./types";

export async function getAllPosts() {
  const data = DUMMY_DATA;

  return data;
}

export async function getPostById(id: number) {
  const data = await getAllPosts();

  const post = data.find((post) => post.id === id);

  return post;
}
