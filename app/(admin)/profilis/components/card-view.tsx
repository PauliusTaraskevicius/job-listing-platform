import { Jobs } from "@/components/jobs/jobs";
import { JobProps } from "@/lib/types";

type Props = {
  data: JobProps[];
};

const ListView = ({ data }: Props) => {
  return (
    <div>
      {data.map((job) => (
        <Jobs key={job.id} job={job} />
      ))}
    </div>
  );
};

export default ListView;
