import { SidebarNavigation } from "@/components/navigation/sidebar-navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarNavigation />
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
        {children}
      </div>
    </div>
  );
}
