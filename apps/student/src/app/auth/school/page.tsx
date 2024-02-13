import { checkSessionAction } from "@/app/_actions";
import AddSchoolForm from "@/components/forms/AddSchoolForm";
import { notFound } from "next/navigation";

const AuthSchoolPage = async () => {
  const user = (await checkSessionAction()).data;
  if (user.schoolId) notFound();

  return (
    <main className="flex min-h-screen flex-col justify-center  bg-muted">
      <section className="mx-6 border bg-card px-6 py-12 shadow sm:mx-auto sm:w-full sm:max-w-[480px] sm:rounded-lg sm:px-12">
        <AddSchoolForm />
      </section>
    </main>
  );
};

export default AuthSchoolPage;
