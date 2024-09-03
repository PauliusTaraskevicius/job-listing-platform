export interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  tags: Array<string>;
  description: string;
}

export interface CategoryType {
  id: number;
  title: string;
}
