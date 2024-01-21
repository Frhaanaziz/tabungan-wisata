import EmailVerificationResetPasswordForm from "@/components/forms/EmailVerificationResetPasswordForm";
import Link from "next/link";

const EmailVerificationResetPasswordPage = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <section className="mx-6 border bg-card px-6 py-12 shadow sm:mx-auto sm:w-full sm:max-w-[480px] sm:rounded-lg sm:px-12">
        <EmailVerificationResetPasswordForm />
        <Link
          href="/auth/signin"
          className="mt-3 inline-block text-center text-sm text-primary underline"
        >
          Back to login
        </Link>
      </section>
    </main>
  );
};

export default EmailVerificationResetPasswordPage;
