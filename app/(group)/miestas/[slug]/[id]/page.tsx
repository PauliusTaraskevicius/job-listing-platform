import { getJobById } from "@/actions/jobs";
import { ListingDetails } from "@/app/darbas/_components/listig-details";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CityJobPage = async (props: Props) => {
  const params = await props.params;
  const jobData = await getJobById(params.id);

  return (
    <div className="flex justify-center items-center h-full">
      <ListingDetails job={jobData} />
    </div>
  );
};

export default CityJobPage;
