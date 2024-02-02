import HeadingWithAction from "@/components/HeadingWithAction";
import UpdateSchoolForm from "@/components/forms/UpdateSchoolForm";
import { api } from "@/trpc/server";

const UpdateSchoolPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const school = await api.school.getById.query({ id });

  return (
    <>
      <HeadingWithAction
        heading="Edit School"
        href="/schools"
        label="Schools"
      />

      <main className="rounded-lg border p-6">
        <UpdateSchoolForm school={school} />
      </main>
    </>
  );
};

export default UpdateSchoolPage;
