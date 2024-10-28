"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Switch } from "./theme-switcher";

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
      <Switch onClick={() => setTheme(theme === "light" ? "dark" : "light")} title={theme}/>
    </div>
  );
};
