import { getUserJobs } from "@/actions/jobs";
import { DataView } from "../profilis/components/data-view";

export default async function Page() {
  const data = await getUserJobs();

  return (
    <div>
      <DataView jobs={data.data} />
    </div>
  );
}
