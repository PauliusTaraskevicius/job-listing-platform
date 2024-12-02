import { getUserJobsWithBookmarks } from "@/actions/jobs";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useQuery } from "@tanstack/react-query";

export default async function Page() {
  const data = await getUserJobsWithBookmarks();


  return (
    <div className="w-full px-4 lg:pl-2 lg:px-0 py-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
