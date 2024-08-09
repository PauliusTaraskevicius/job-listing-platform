"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ModeToggle = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {" "}
      {theme === "light" && (
        <Button
          size="icon"
          className="bg-transparent hover:bg-transparent"
          onClick={() => setTheme("dark")}
        >
          <Moon className="size-7 text-black" />
        </Button>
      )}{" "}
      {theme === "dark" && (
        <Button
          size="icon"
          className="bg-transparent hover:bg-transparent"
          onClick={() => setTheme("light")}
        >
          <Sun className="size-7 text-white" />
        </Button>
      )}
    </div>
  );
};
