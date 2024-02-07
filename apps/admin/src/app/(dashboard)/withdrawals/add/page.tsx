import { checkSessionAction } from "@/app/_actions";
import HeadingWithAction from "@/components/HeadingWithAction";
import AddWithdrawalForm from "@/components/forms/AddWithdrawalForm";
import { api } from "@/trpc/server";

const AddWithdrawalPage = async () => {
  const [session, schools] = await Promise.all([
    checkSessionAction(),
    api.school.getAll.query(),
  ]);
  const userId = session.data.id;

  return (
    <>
      <HeadingWithAction
        heading="Add Withdrawal"
        href="/withdrawals"
        label="Withdrawals"
      />

      <main>
        <AddWithdrawalForm userId={userId} schools={schools} />
      </main>
    </>
  );
};

export default AddWithdrawalPage;
