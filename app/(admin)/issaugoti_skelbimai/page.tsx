import { getUserJobsWithBookmarks } from "@/actions/jobs";
import Bookmarks from "@/components/jobs/bookmarks";

import { columns } from "@/components/jobs/data-view/columns";
import { DataTable } from "@/components/jobs/data-view/data-table";

export default async function Page() {
  const data = await getUserJobsWithBookmarks();

  return (
    <div>
      <Bookmarks />
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
