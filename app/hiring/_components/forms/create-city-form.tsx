"use client";

import { useRouter } from "next/navigation";

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

import { createCitySchema } from "@/actions/city/validation";

import { useMutation } from "@tanstack/react-query";
import { createCity } from "@/actions/city";
import { useToast } from "@/components/ui/use-toast";

export const CreateCityForm = () => {
  const { toast } = useToast();
  const route = useRouter();

  const form = useForm<z.infer<typeof createCitySchema>>({
    resolver: zodResolver(createCitySchema),
    defaultValues: {
      cityTitle: "",
      slug: "",
    },
  });

  const { mutate: addCity, isPending } = useMutation({
    mutationFn: createCity,

    onSuccess: () => {
      toast({
        title: "Miestas sėkmingai sukurtas.",
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

  function onSubmit(values: z.infer<typeof createCitySchema>) {
    addCity(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cityTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Miestas</FormLabel>
              <FormControl>
                <Input placeholder="Miestas" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Sukurti miestą
        </Button>
      </form>
    </Form>
  );
};
