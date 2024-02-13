import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { DataTable } from "@ui/components/table/data-table";
import { paymentColumn } from "@/components/data-table/columns/PaymentColumn";
import { checkSessionAction } from "@/app/_actions";

const DashboardRecentTransactions = async () => {
  const { data: user } = await checkSessionAction();
  if (!user.schoolId) redirect("/auth/school");

  const [userPayments] = await Promise.all([api.user.getAllPayments.query({})]);

  return (
    <div>
      <h2 className="mb-5 text-xl font-semibold">Recent Transactions</h2>
      <DataTable
        columns={paymentColumn as any}
        data={userPayments}
        emptyMessage={"No transactions."}
      />
    </div>
  );
};

export default DashboardRecentTransactions;
