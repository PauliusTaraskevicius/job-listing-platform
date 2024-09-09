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
import MultipleSelector, { Option } from "@/components/multiple-selector";
import { Switch } from "@/components/ui/switch";


export const CreateJobForm = () => {
  const { toast } = useToast();
  const route = useRouter();

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      company: "",
      description: "",
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
                <FormLabel>Įmonės pavadinimas</FormLabel>
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
          {/* <MultipleSelector
            defaultOptions={OPTIONS}
            placeholder="Select frameworks you like..."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          /> */}
          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Miesto pavadinimas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Miesto pavadinimas"
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
          <Button type="submit" disabled={isPending}>
            Sukurti kategoriją
          </Button>
        </form>
      </Form>
    </div>
  );
};
