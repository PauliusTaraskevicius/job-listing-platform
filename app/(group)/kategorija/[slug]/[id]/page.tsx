import { getJobById } from "@/actions/jobs";
import { ListingDetails } from "@/app/(landing)/darbas/_components/listig-details";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CategoryJobs = async (props: Props) => {
  const params = await props.params;
  const jobData = await getJobById(params.id);

  return (
    <div className="flex justify-center items-center h-full">
      <ListingDetails job={jobData} />
    </div>
  );
};

export default CategoryJobs;
