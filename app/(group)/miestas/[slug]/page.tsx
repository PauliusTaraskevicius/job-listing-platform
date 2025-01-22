
import { getCityBySlug } from "@/actions/city";
import { Banner } from "@/app/(group)/_components/banner";

import { CityPaginationSection } from "../_components/city-pagination-section";


type CityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const CityPage = async (props: CityPageProps) => {
  const params = await props.params;
  const { slug } = params;

  const city = await getCityBySlug(slug);

  return (
    <div>
      <Banner title={city?.cityTitle}/>
      <CityPaginationSection itemsPerPageNumber={10} jobsData={city?.jobs} />
    </div>
  );
};

export default CityPage;
