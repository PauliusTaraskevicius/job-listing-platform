import { Bookmark, Category, City, PaymentMethod } from "@prisma/client";

export type JobProps = {
  id: string;
  title: string;
  company: string;
  description: string;
  applyUrl: string;
  paymentMethod: PaymentMethod;
  salary: string;
  premium?: boolean | null;
  remote?: boolean | null;
  bookmarks: Bookmark[];
  category: Category;
  city: City;
};

export interface PostsPage {
  jobs: JobProps[];
  nextCursor: string | null;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}
