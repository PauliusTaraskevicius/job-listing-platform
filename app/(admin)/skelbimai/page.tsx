import { getUserJobs } from "@/actions/jobs";
import { DataTable } from "@/components/jobs/data-view/data-table";
import { columns } from "@/components/jobs/data-view/columns";

export default async function Page() {
  const data = await getUserJobs();

  return (
    <div className="w-full px-4 lg:pl-2 lg:px-0 py-2">
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
