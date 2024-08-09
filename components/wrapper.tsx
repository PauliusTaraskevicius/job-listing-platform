import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Wrapper = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        "w-full max-w-screen-xl mx-auto flex flex-col min-h-screen bg-blue-400",
        className
      )}
    >
      {children}
    </div>
  );
};
