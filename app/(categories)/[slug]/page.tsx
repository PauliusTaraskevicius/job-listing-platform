import { getCategoryBySlug } from "@/actions/category";
import { Banner } from "../_components/banner";

import Link from "next/link";
import { Jobs } from "@/components/jobs/jobs";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = params;

  const category = await getCategoryBySlug(slug);

  return (
    <div>
      <Banner title={category?.title} />
      {category?.jobs.map((job) => (
        <div className="w-full py-1.5 cursor-pointer lg:px-0 px-1" key={job.id}>
          <Link href={`/job/${job.id}`}>
            <Jobs job={job} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
