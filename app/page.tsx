import { Banner } from "@/components/banner";
import { PaginationSection } from "@/components/pagination-section";

import { DUMMY_DATA } from "@/DUMMY_DATA";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Banner />

      <PaginationSection jobsData={DUMMY_DATA} />
    </div>
  );
}
