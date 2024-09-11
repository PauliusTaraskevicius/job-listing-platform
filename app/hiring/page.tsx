import { getCategories } from "@/actions/category";
import { CreateJobForm } from "./_components/forms/create-job-form";


const Hiring = async () => {

  const categories = await getCategories()

  return <div>
    <CreateJobForm categories={categories} />
  </div>;
};

export default Hiring;
