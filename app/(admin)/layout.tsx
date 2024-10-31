import { getJobs, getUserJobs } from "@/actions/jobs";
import { SidebarNavigation } from "@/components/navigation/sidebar-navigation";
import { DataView } from "./profilis/components/data-view";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getUserJobs();
  return (
    <div className="flex">
      <div>
        <SidebarNavigation />
      </div>
      <div className="mx-auto flex flex-col w-full max-w-7xl grow gap-5">
        <DataView jobs={data.data} />
        {children}
      </div>
    </div>
  );
}
