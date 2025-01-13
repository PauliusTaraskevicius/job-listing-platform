import { getCategoryBySlug } from "@/actions/category";

import { PaginationSection } from "@/components/pagination-section";
import { Banner } from "../../_components/banner";

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
      <Banner title={category?.title.replace(/\//g, " ")} />
      <PaginationSection itemsPerPageNumber={10} jobsData={category?.jobs} />
    </div>
  );
};

export default CategoryPage;
