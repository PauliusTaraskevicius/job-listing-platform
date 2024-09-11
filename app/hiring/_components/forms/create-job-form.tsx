"use client";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Banner } from "../banner";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { createJobSchema } from "@/actions/jobs/validation";
import { createJob } from "@/actions/jobs";
import MultipleSelector from "@/components/multiple-selector";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { OPTIONS } from "@/lib/city-options";
import { Category } from "@prisma/client";

type Props = {
  categories: {
    data: Category[];
  };
};

export const CreateJobForm = ({ categories }: Props) => {
  const { toast } = useToast();
  const route = useRouter();

  console.log(categories.data)

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      company: "",
      description: "",
      applyUrl: "",
      location: "",
      remote: false,
    },
  });

  const { mutate: postJob, isPending } = useMutation({
    mutationFn: createJob,

    onSuccess: () => {
      toast({
        title: "Skelbimas sėkmingai sukurtas.",
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

  function onSubmit(values: z.infer<typeof createJobSchema>) {
    postJob(values);
  }

  return (
    <div>
      <Banner />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Įmonės</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Įmonės pavadinimas"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Darbo vietos pavadinimas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Darbo vietos pavadinimas"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategorija</FormLabel>
                <FormControl>
                  <MultipleSelector
                    defaultOptions={categories.data}
                    disabled={isPending}
                    onChange={field.onChange}
                    maxSelected={5}
                    placeholder="Pasirinkite miestą"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Rezultatų nerasta bandykite dar kartą.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Miestas</FormLabel>
                <FormControl>
                  <MultipleSelector
                    defaultOptions={OPTIONS}
                    disabled={isPending}
                    onChange={field.onChange}
                    maxSelected={5}
                    placeholder="Pasirinkite miestą"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Rezultatų nerasta bandykite dar kartą.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remote"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Darbas nuotoliniu</FormLabel>
                  <FormDescription>
                    Receive emails about new products, features, and more.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remote"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-between rounded-lg border p-4">
                <FormLabel className="text-base">
                  Darbo vietos aprašas
                </FormLabel>
                <FormControl>
                  <Textarea />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="applyUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aplikacijos nuoroda</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Aplikacijos nuoroda"
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
    </div>
  );
};
