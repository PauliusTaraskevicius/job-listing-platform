import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}
