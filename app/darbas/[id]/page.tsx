import { getJobById } from "@/actions/jobs";
import { ListingDetails } from "../_components/listig-details";


type Props = {
  params: Promise<{
    id: string;
  }>;
};

const JobDetails = async (props: Props) => {
  const params = await props.params;
  const jobData = await getJobById(params.id);
  return (
    <div className="flex justify-center items-center h-full">
      <ListingDetails job={jobData} />
    </div>
  );
};

export default JobDetails;
