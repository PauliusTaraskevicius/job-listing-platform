import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { SidebarNavigation } from "@/components/navigation/sidebar-navigation";
import SubscriptionLevelProvider from "@/components/PREMIUM/subscription-level-provider";
import { getUserSubscriptionLevel } from "@/components/PREMIUM/subscriptions";
import { auth } from "@clerk/nextjs/server";
import { AdminNavigation } from "./_components/admin-navigation";

export default async function AdminMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <AdminNavigation />
      <div className="flex">
        <div className="flex py-2">
          <SidebarNavigation />
        </div>
        <div className="mx-auto flex flex-col w-full max-w-7xl grow gap-5">
          {children}
        </div>
        <div>
          <BottomNavigation />
        </div>
      </div>
    </SubscriptionLevelProvider>
  );
}
