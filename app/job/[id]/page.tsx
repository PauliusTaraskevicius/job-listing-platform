type Props = {
  params: {
    id: number;
  };
};

const JobId = async ({ params }: Props) => {
  return (
    <div className="flex justify-center items-center h-full">
      {params.id}
    </div>
  );
};

export default JobId;
