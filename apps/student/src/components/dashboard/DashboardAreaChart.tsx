import { api } from "@/trpc/server";
import BalanceAreaChart from "./BalanceAreaChart";
import { PaymentStatus } from "@repo/validators/payment";
import { formatDateToShortMonthDay } from "@repo/utils";

const DashboardAreaChart = async ({ balance }: { balance: number }) => {
  const [payments] = await Promise.all([
    api.user.getAllPayments.query({
      status: PaymentStatus.completed,
    }),
  ]);

  let balanceAmnt = 0;
  const chartData = payments.map(({ createdAt, amount }) => {
    balanceAmnt += amount;
    return {
      date: formatDateToShortMonthDay(createdAt),
      Balance: balanceAmnt,
    };
  });

  return <BalanceAreaChart data={chartData} balance={balance} />;
};

export default DashboardAreaChart;
