export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen flex justify-center items-center ">
        <div className="mx-auto flex flex-col w-full  max-w-7xl grow gap-5">
          {children}
        </div>
      </div>
    </>
  );
}
