


import { getCityBySlug } from "@/actions/city";
import { Banner } from "@/app/(group)/_components/banner";

import { PaginationSection } from "@/components/pagination-section";


type CityPageProps = {
  params: {
    slug: string;
  };
};

const CityPage = async ({ params }: CityPageProps) => {
  const { slug } = params;

  const city = await getCityBySlug(slug);

  return (
    <div>
      <Banner title={city?.cityTitle}/>
      <PaginationSection itemsPerPageNumber={10} jobsData={city?.jobs} />
    </div>
  );
};

export default CityPage;
