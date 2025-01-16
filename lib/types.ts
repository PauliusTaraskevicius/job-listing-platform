import {
  Bookmark,
  Category,
  City,
  Job,
  PaymentMethod,
  User,
} from "@prisma/client";


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
  category: Category
  city: City;
  author: User
  createdAt: Date
};

export interface PostsPage {
  jobs: JobProps[];
  nextCursor: string | null;
}

export type BookmarkProps = {
  job: JobProps;
};

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export interface UserBookmarkedJobs {
  job: Job & {
    category: Category;
    city: City;
    bookmarks: Bookmark[];
  };
}
