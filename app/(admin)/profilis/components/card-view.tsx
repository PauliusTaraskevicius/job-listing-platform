import { Jobs } from "@/components/jobs/jobs";
import { PaginationSection } from "@/components/pagination-section";
import { JobProps } from "@/lib/types";

type Props = {
  data: JobProps[];
};

const CardView = ({ data }: Props) => {
  return (
    <div className="pb-16 lg:pb-0">
      <PaginationSection jobsData={data} itemsPerPageNumber={5} />
    </div>
  );
};

export default CardView;
