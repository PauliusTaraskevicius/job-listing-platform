import { getCategoryBySlug } from "@/actions/category";

import { Banner } from "../../_components/banner";
import { CategoryPaginationSection } from "../_components/category-pagination-section";

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
      <CategoryPaginationSection itemsPerPageNumber={10} jobsData={category?.jobs} />
    </div>
  );
};

export default CategoryPage;
