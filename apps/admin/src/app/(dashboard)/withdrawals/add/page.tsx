import { checkSessionAction } from "@/app/_actions";
import HeadingWithAction from "@/components/HeadingWithAction";
import AddWithdrawalForm from "@/components/forms/AddWithdrawalForm";
import { api } from "@/trpc/server";

const AddWithdrawalPage = async () => {
  const userId = (await checkSessionAction()).data.id;
  const schools = await api.school.getAll.query();

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
