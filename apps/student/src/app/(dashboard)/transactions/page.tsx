import { checkSessionAction } from "@/app/_actions";
import TopUpButton from "@/components/TopUpButton";
import { paymentColumn } from "@/components/data-table/columns/PaymentColumn";
import { api } from "@/trpc/server";
import { PaymentStatus } from "@repo/validators/payment";
import { DataTable } from "@ui/components/table/data-table";
import { cn } from "@ui/lib/utils";
import { ScrollTextIcon } from "lucide-react";

const Transactions = async () => {
  const user = (await checkSessionAction()).data;

  const userPayments = await api.user.getAllPayments.query({});
  const totalTransactions = userPayments.length;
  const completedTransactions = userPayments.filter(
    (payment) => payment.status === PaymentStatus.completed,
  ).length;
  const pendingTransactions = userPayments.filter(
    (payment) => payment.status === PaymentStatus.pending,
  ).length;
  const failedTransactions = userPayments.filter(
    (payment) => payment.status === PaymentStatus.failed,
  ).length;

  const paymentDetails = [
    {
      type: "Total Transactions",
      value: totalTransactions,
      color: "bg-blue-600",
    },
    {
      type: "Completed Transactions",
      value: completedTransactions,
      color: "bg-green-600",
    },
    {
      type: "Pending Transactions",
      value: pendingTransactions,
      color: "bg-yellow-600",
    },
    {
      type: "Failed Transactions",
      value: failedTransactions,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="container min-h-[calc(100vh-105px-112px)]">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">View your latest transactions</p>
        </div>
        <TopUpButton userId={user.id} />
      </header>

      <section className="mt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {paymentDetails.map(({ color, type, value }) => (
            <div
              key={type}
              className="flex items-center gap-3 rounded-md border p-5 shadow"
            >
              <div className={cn("rounded-full p-3", color)}>
                <ScrollTextIcon className="invert" />
              </div>
              <div>
                <p className="font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{type}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <DataTable
            columns={paymentColumn as any}
            data={userPayments}
            emptyMessage={"No transactions."}
          />
        </div>
      </section>
    </div>
  );
};

export default Transactions;
