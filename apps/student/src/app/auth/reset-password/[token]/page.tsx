import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { getBackendApi } from "@/lib/axios";
import { getNestErrorMessage } from "@repo/utils";

const ResetPasswordPage = async ({
  params: { token },
}: {
  params: { token: string };
}) => {
  try {
    await getBackendApi().post("/verifications/verify-token", {
      token,
    });
  } catch (error) {
    throw new Error(getNestErrorMessage(error));
  }

  return (
    <main className="flex min-h-screen flex-col justify-center">
      <section className="mx-6 border bg-card px-6 py-12 shadow sm:mx-auto sm:w-full sm:max-w-[480px] sm:rounded-lg sm:px-12">
        <ResetPasswordForm token={token} />
      </section>
    </main>
  );
};

export default ResetPasswordPage;
