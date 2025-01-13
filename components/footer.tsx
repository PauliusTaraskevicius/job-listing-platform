import { getCategories } from "@/actions/category";
import { getCities } from "@/actions/city";
import Link from "next/link";

const Footer = async () => {
  const categories = await getCategories();
  const cities = await getCities()

  return (
    <div className="bg-green-100 w-full flex space-x-8">
      {categories.data.map((category) => {
        const clearTitle = category.title.replace(/\//g, " ");

        return (
          <Link key={category.id} href={`/kategorija/${category.slug}`}>
            <div className="">
              <h1 className="text-sm">{clearTitle}</h1>
            </div>
          </Link>
        );
      })}
      {cities.data.map((city) => {
        return (
          <Link key={city.id} href={`/miestas/${city.slug}`}>
            <div className="">
              <h1 className="text-sm">{city.cityTitle}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Footer;
