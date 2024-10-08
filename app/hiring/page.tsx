import { getCategories, getCategoriesWithJobs } from "@/actions/category";
import { CreateJobForm } from "./_components/forms/create-job-form";
import { CreateCategoryForm } from "./_components/forms/create-category-form";
import { CreateCityForm } from "./_components/forms/create-city-form";
import { getCities } from "@/actions/city";
import { getJobs } from "@/actions/jobs";

const Hiring = async () => {
  const categories = await getCategories();
  const categoriesWithJobs = await getCategoriesWithJobs();
  const cities = await getCities();

  return (
    <div>
      <CreateJobForm categories={categories} cities={cities} />
      {/* <CreateCategoryForm />
      <CreateCityForm /> */}
    </div>
  );
};

export default Hiring;
