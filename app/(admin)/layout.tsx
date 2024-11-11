import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { SidebarNavigation } from "@/components/navigation/sidebar-navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="flex">
        <SidebarNavigation />
      </div>
      <div className="mx-auto flex flex-col w-full max-w-7xl grow gap-5">
        {children}
      </div>
      <div>
        <BottomNavigation />
      </div>
    </div>
  );
}
