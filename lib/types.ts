import { PaymentMethod } from "@prisma/client";

export type CategoryProps = {
  id: string;
  title: string;
  jobs: JobProps[];
};
export type CityProps = {
  id: string;
  cityTitle: string;
  jobs: JobProps[];
};

export type JobProps = {
  id: string;
  title: string;
  company: string;
  description: string;
  applyUrl: string;
  paymentMethod: PaymentMethod;
  salary: string;
  premium?: boolean;
  remote?: boolean;
  category: CategoryProps;
  city: CityProps;
};


export interface PostsPage {
  jobs: JobProps[];
  nextCursor: string | null;
}