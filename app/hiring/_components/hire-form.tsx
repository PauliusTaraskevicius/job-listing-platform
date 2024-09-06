"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { createCategorySchema } from "@/actions/category/validation";

import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/actions/category";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const HireForm = () => {
  const { toast } = useToast();
  const route = useRouter();

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate: addCategory, isPending } = useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      toast({
        title: "Kategorija sėkmingai sukurta.",
      }),
        route.push("/");
    },
    onError: () => {
      toast({
        title: "Įvyko klaida. Bandykite dar kartą",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof createCategorySchema>) {
    addCategory(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategorija</FormLabel>
              <FormControl>
                <Input
                  placeholder="Kategorija"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Sukurti kategoriją
        </Button>
      </form>
    </Form>
  );
};
