import { getCategories } from "@/actions/category";
import { CreateJobForm } from "./_components/forms/create-job-form";
import { getCities } from "@/actions/city";

const Hiring = async () => {
  const categories = await getCategories();
  const cities = await getCities();

  return (
    <div>
      <CreateJobForm categories={categories} cities={cities} />
    </div>
  );
};

export default Hiring;
