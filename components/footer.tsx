import { getCategories } from "@/actions/category";
import Link from "next/link";

const Footer = async () => {
  const categories = await getCategories();

  return (
    <div className="bg-green-100 w-full flex space-x-8">
      {categories.data.map((category) => (
        <Link key={category.id} href={`/${category.title}`}>
          <div className="">
            <h1 className="text-3xl">{category.title}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Footer;
