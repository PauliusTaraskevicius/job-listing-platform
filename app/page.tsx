import { getCategories } from "@/actions/category";
import { getCities } from "@/actions/city";

import { Banner } from "@/components/banner";
import Filter from "@/components/filter";
import { CreateCityForm } from "./hiring/_components/forms/create-city-form";


export default async function Home() {
  const categories = await getCategories();
  const cities = await getCities();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Banner />
      <CreateCityForm />
      <Filter categoriesData={categories.data} citiesData={cities.data} />
    </div>
  );
}
