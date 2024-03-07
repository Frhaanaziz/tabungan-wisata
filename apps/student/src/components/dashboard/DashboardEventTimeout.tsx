"use client";
import { Event, EventRegistration } from "@repo/types";
import { Card, ProgressCircle } from "@tremor/react";

interface Props {
  eventRegistration: EventRegistration & { event: Event };
}

const DashboardEventTimeout = ({ eventRegistration }: Props) => {
  const { paymentLimit, startDate, createdAt, event } = eventRegistration;

  const daysLeft = Math.min(
    Math.floor(
      (startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    ),
    Math.floor(
      (paymentLimit.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    ),
  );

  // Hitung total hari dalam rentang tanggal
  const totalDays =
    (paymentLimit.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

  // Hitung hari yang telah berlalu
  const daysPassed =
    (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

  // Hitung persentase progress (dibulatkan ke bilangan bulat)
  const progressValue = +((daysPassed / totalDays) * 100).toFixed(2);

  return (
    <Card className="">
      <h2 className="mb-5 font-semibold">{event.name}</h2>

      <div className="flex flex-col items-center gap-5 md:flex-row">
        <ProgressCircle value={daysLeft <= 0 ? 100 : progressValue} size="xl">
          <span className="font-medium text-slate-700">
            {daysLeft < 0 ? 0 : daysLeft} {daysLeft === 1 ? "day" : "days"} left
          </span>
        </ProgressCircle>

        <div className="space-y-3">
          <h3 className="font-medium">
            Important Notice: Deadline for Event Payments Approaching!
          </h3>
          <p className="text-sm text-muted-foreground">
            Get set for an incredible event experience! Friendly reminder to all
            participants: make sure to settle your payments two weeks prior to
            the event. Secure your spot hassle-free and join us for an
            unforgettable time! 🎉💳
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DashboardEventTimeout;
