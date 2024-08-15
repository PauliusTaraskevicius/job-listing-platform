import { Banner } from "@/components/banner";
import { Jobs } from "@/components/jobs/jobs";

import { DUMMY_DATA } from "@/DUMMY_DATA";
import Link from "next/link";

export default function Home() {
  const data = DUMMY_DATA;

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Banner />

      {data.map((job) => (
        <div key={job.title} className="w-full py-1.5 cursor-pointer">
          <Link href={`/job/${job.id}`}>
            <Jobs job={job} />
          </Link>
        </div>
      ))}
    </div>
  );
}
