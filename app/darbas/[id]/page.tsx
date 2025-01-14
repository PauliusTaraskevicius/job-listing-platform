import { getJobById } from "@/actions/jobs";
import { ListingDetails } from "../_components/listig-details";


type Props = {
  params: {
    id: string;
  };
};

const JobDetails = async ({ params }: Props) => {
  const jobData = await getJobById(params.id);
  return (
    <div className="flex justify-center items-center h-full">
      <ListingDetails job={jobData} />
    </div>
  );
};

export default JobDetails;
