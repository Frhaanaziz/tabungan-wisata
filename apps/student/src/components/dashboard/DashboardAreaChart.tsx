import { api } from "@/trpc/server";
import BalanceAreaChart from "./BalanceAreaChart";
import { PaymentStatus } from "@repo/validators/payment";
import { formatDateToShortMonthDay } from "@repo/utils";
import { checkSessionAction } from "@/app/_actions";

const DashboardAreaChart = async ({ balance }: { balance: number }) => {
  const user = (await checkSessionAction()).data;

  const [payments] = await Promise.all([
    api.user.getAllPayments.query({
      status: PaymentStatus.completed,
    }),
  ]);

  const withInitialBalance = [
    { createdAt: user.createdAt, amount: 0 },
    ...payments,
  ];

  let balanceAmnt = 0;
  const chartData = withInitialBalance.map(({ createdAt, amount }) => {
    balanceAmnt += amount;
    return {
      date: formatDateToShortMonthDay(createdAt),
      Balance: balanceAmnt,
    };
  });

  return <BalanceAreaChart data={chartData} balance={balance} />;
};

export default DashboardAreaChart;
