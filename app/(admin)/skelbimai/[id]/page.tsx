import { getCities } from "@/actions/city";
import { getJobById } from "@/actions/jobs";
import { getCategories } from "@/actions/category";
import { EditJobForm } from "@/app/hiring/_components/forms/edit-job-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  const {
    id
  } = params;

  const categories = await getCategories();
  const cities = await getCities();
  const job = await getJobById(id);

  return (
    <div>
      <EditJobForm categories={categories} cities={cities} job={job} />
    </div>
  );
}
