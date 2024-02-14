"use client";
import { AreaChart, CustomTooltipProps } from "@tremor/react";
import { toRupiah, toRupiahSuffix } from "@repo/utils";
import { EventRegistration } from "@repo/types";

type Props = {
  data: any;
  balance: number;
  eventRegistrations: EventRegistration[];
};

const BalanceAreaChart = ({ data, balance, eventRegistrations }: Props) => {
  const totalCost = eventRegistrations.reduce(
    (acc, curr) => acc + curr.cost,
    0,
  );

  const customTooltip = (props: CustomTooltipProps) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {toRupiah(category.value as number)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-md border p-5 shadow">
      <div>
        <h3 className="text-sm text-muted-foreground">Balance Progress</h3>
        <p className="text-xl font-semibold">{toRupiah(balance)}</p>
      </div>
      <AreaChart
        data={data}
        index="date"
        categories={["Balance"]}
        colors={["blue"]}
        yAxisWidth={60}
        showAnimation
        showGradient
        maxValue={totalCost}
        noDataText="No transaction available."
        valueFormatter={(value: number) => toRupiahSuffix(value)}
        customTooltip={customTooltip}
      />
    </div>
  );
};

export default BalanceAreaChart;
