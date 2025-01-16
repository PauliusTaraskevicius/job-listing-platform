import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="w-full px-4 lg:pl-2 lg:px-0 py-2">
    <UserProfile
      appearance={{
        elements: {
          pageScrollBox: "dark:bg-background",
          navbar: "dark:bg-background",
        },
      }}
    />
  </div>
);

export default UserProfilePage;
