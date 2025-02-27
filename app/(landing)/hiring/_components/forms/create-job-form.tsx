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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Banner } from "../banner";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { createJobSchema } from "@/actions/jobs/validation";
import { createJob } from "@/actions/jobs";
import { Switch } from "@/components/ui/switch";

import { Category, City } from "@prisma/client";
import RichTextField from "@/components/rich-text-field/rich-text-field";

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
      paymentMethod: "BRUTO",
      salary: "",
      remote: false,
      premium: false,
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
    <div className="flex flex-col space-y-20 p-4">
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
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Darbas nuotoliniu</FormLabel>
                  <FormDescription>
                    Darbo funkcijų ar jų dalių su darbdaviu suderinta tvarka
                    reguliariai atliekama nuotoliniu būdu.
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
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Darbo vietos aprašymas</FormLabel>
                <FormControl>
                  <RichTextField
                    className="min-h-[24rem]"
                    description={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-2">
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Darbo užmokestis</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1200 - 1500 &euro;/mėn"
                      {...field}
                      disabled={isPending}
                      type="tel"
                      pattern="^[0-9-]*$"
                      maxLength={12}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Darbo užmokesčio tipas</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={isPending}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Pasirinkite  mokėjimo tipą"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="BRUTO">Bruto</SelectItem>
                        <SelectItem value="NETO">Neto</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
          <Button disabled={isPending} type="submit" className="w-full">
            Talpinti skelbimą
          </Button>
        </form>
      </Form>
    </div>
  );
};
