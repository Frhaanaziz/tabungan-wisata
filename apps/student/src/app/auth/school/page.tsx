import AddSchoolForm from "@/components/forms/AddSchoolForm";

const AuthSchoolPage = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <section className="mx-6 border bg-card px-6 py-12 shadow sm:mx-auto sm:w-full sm:max-w-[480px] sm:rounded-lg sm:px-12">
        <AddSchoolForm />
      </section>
    </main>
  );
};

export default AuthSchoolPage;
