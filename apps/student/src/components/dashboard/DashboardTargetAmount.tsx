import { Card } from "@tremor/react";
import { toRupiah } from "@repo/utils";
import ProgressBar from "./ProgressBar";
import { Event, EventRegistration } from "@repo/types";

interface Props {
  balance: number;
  eventRegistrations: (EventRegistration & { event: Event })[];
}

const DashboardTargetAmount = async ({
  balance,
  eventRegistrations,
}: Props) => {
  if (!eventRegistrations.length) return null;

  const targetAmount = eventRegistrations.reduce(
    (acc, registration) => acc + registration.cost,
    0,
  );
  const progress = (balance / targetAmount) * 100;
  const amountLeft = targetAmount - balance;

  return (
    <Card>
      <div className="flex items-end justify-between">
        <h3>Target Amount</h3>
        <p className="text-sm">{toRupiah(amountLeft)} left</p>
      </div>

      <ProgressBar value={Number(progress.toFixed(0)) || 0} className="my-3" />

      <p className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{progress.toFixed(0)}% of target amount</span>
        <span>{toRupiah(targetAmount)}</span>
      </p>
    </Card>
  );
};

export default DashboardTargetAmount;
