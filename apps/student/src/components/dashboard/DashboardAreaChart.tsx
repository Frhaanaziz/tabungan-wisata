import { api } from "@/trpc/server";
import BalanceAreaChart from "./BalanceAreaChart";
import { PaymentStatus } from "@repo/validators/payment";
import { formatDateToShortMonthDay } from "@repo/utils";
import { Event, EventRegistration, User } from "@repo/types";

type Props = {
  balance: number;
  eventRegistrations: (EventRegistration & { event: Event })[];
  user: User;
};

const DashboardAreaChart = async ({
  balance,
  eventRegistrations,
  user,
}: Props) => {
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

  return (
    <BalanceAreaChart
      data={chartData}
      balance={balance}
      eventRegistrations={eventRegistrations}
    />
  );
};

export default DashboardAreaChart;
