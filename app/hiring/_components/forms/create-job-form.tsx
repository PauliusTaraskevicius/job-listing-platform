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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { Banner } from "../banner";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { createJobSchema } from "@/actions/jobs/validation";
import { createJob } from "@/actions/jobs";

import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Category, City } from "@prisma/client";
import MultipleSelector from "@/components/multiple-selector";

type Props = {
  categories: {
    data: Category[];
  };
  cities: {
    data: City[];
  };
};

export const CreateJobForm = ({ categories, cities }: Props) => {
  const { toast } = useToast();
  const route = useRouter();

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      company: "",
      description: "",
      applyUrl: "",
      remote: false,
      categoryId: "",
      cityId: "",
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
                <FormLabel>Įmonė</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Įmonės pavadinimas"
                    {...field}
                    disabled={isPending}
                    type="text"
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
                <Select
                  onValueChange={field.onChange}
                  disabled={isPending}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Pasirinkite kategoriją"
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.data.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Miestas</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  disabled={isPending}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Pasirinkite miestą"
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.data.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.cityTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remote"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Darbas nuotoliniu</FormLabel>
                  <FormDescription>
                    Produk ini akan muncul di Home Page
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {/* <FormField
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
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-between rounded-lg border p-4">
                <FormLabel className="text-base">
                  Darbo vietos aprašas
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Darbo vietos aprašymas" onChange={field.onChange}/>
                </FormControl>
                <FormMessage />
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
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
