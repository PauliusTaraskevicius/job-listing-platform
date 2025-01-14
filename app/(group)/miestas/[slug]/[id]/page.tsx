import { getJobById } from "@/actions/jobs";
import { ListingDetails } from "@/app/darbas/_components/listig-details";

type Props = {
  params: {
    id: string;
  };
};

const CityJobPage = async ({ params }: Props) => {
  const jobData = await getJobById(params.id);

  return (
    <div className="flex justify-center items-center h-full">
      <ListingDetails job={jobData} />
    </div>
  );
};

export default CityJobPage;
