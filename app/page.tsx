
import { getCategories } from "@/actions/category";
import { getJobs } from "@/actions/jobs";
import { Banner } from "@/components/banner";
import Filter from "@/components/filter";
import { PaginationSection } from "@/components/pagination-section";

import { DUMMY_DATA } from "@/DUMMY_DATA";


export default async function Home() {
  const jobs = await getJobs();
  const categories = await getCategories()

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Banner />
      <Filter categoriesData={categories.data}/>
      {/* <PaginationSection jobsData={jobs.data} /> */}
    </div>
  );
}
