import SignInForm from "@/components/forms/SignInForm";
import Link from "next/link";

const SignInPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const callbackUrl = searchParams.callbackUrl;
  const error = searchParams.error;

  return (
    <main className="flex min-h-screen flex-1 flex-col justify-center bg-muted py-12 sm:px-6 lg:px-8 ">
      <h1 className="mt-6 text-center text-4xl font-bold leading-9 tracking-tight ">
        Welcome back
      </h1>

      <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-[550px]">
        <div className="mx-6 border bg-card px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <SignInForm callbackUrl={callbackUrl} error={error} />
        </div>
      </section>

      <Link
        href="/auth/signup"
        className="mt-10 inline-block text-center text-sm font-semibold"
      >
        Don&apos;t have an account? Sign up
      </Link>
    </main>
  );
};

export default SignInPage;
