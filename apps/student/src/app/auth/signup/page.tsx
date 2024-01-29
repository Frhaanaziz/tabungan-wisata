import SignUpForm from "@/components/forms/SignUpForm";

const SignUpPage = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col justify-center  bg-muted py-12 sm:px-6 lg:px-8 ">
      <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-[550px]">
        <div className="mx-6 border bg-card px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <SignUpForm />
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
