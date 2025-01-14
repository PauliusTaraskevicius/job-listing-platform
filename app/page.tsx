import { getCategories } from "@/actions/category";
import { getCities } from "@/actions/city";

import { Banner } from "@/components/banner";
import Filter from "@/components/filter";


export default async function Home() {
  const categories = await getCategories();
  const cities = await getCities();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Banner />
      <Filter categoriesData={categories.data} citiesData={cities.data} />
    </div>
  );
}
