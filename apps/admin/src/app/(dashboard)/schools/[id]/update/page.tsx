import HeadingWithAction from "@/components/HeadingWithAction";
import UpdateSchoolForm from "@/components/forms/UpdateSchoolForm";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

const UpdateSchoolPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  let school = null;
  try {
    school = await api.school.getById.query({ id });
  } catch (error) {
    console.error("UpdateSchoolPage", error);
    notFound();
  }
  if (!school) notFound();

  return (
    <>
      <HeadingWithAction
        heading="Edit School"
        href="/schools"
        label="Schools"
      />

      <main className="rounded-lg border p-6 shadow-md">
        <UpdateSchoolForm school={school} />
      </main>
    </>
  );
};

export default UpdateSchoolPage;
