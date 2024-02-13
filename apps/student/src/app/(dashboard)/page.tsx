import DashboardAreaChart from "@/components/dashboard/DashboardAreaChart";
import DashboardEventTimeout from "@/components/dashboard/DashboardEventTimeout";
import DashboardQuickAccess from "@/components/dashboard/DashboardQuickAccess";
import DashboardRecentTransactions from "@/components/dashboard/DashboardRecentTransactions";
import DashboardTargetAmount from "@/components/dashboard/DashboardTargetAmount";
import { api } from "@/trpc/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [balance, eventRegistrations] = await Promise.all([
    api.user.getBalance.query(),
    api.school.getEventRegistrations.query(),
  ]);

  return (
    <div className="container grid min-h-[calc(100vh-105px-112px)] max-w-[1600px] grid-cols-1 gap-10 xl:grid-cols-5">
      <section className="space-y-10 xl:col-span-2">
        <DashboardQuickAccess eventRegistrations={eventRegistrations} />

        <div className="space-y-2">
          <h3>Your balance</h3>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-semibold">
              {balance.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <Link
              href={"/transactions"}
              className="hidden text-sm text-primary md:block"
            >
              View Transactions
            </Link>
          </div>
        </div>

        <DashboardTargetAmount
          balance={balance}
          eventRegistrations={eventRegistrations}
        />

        <DashboardEventTimeout eventRegistrations={eventRegistrations} />
      </section>

      <section className="space-y-10 xl:col-span-3">
        <DashboardAreaChart balance={balance} />

        <DashboardRecentTransactions />
      </section>
    </div>
  );
}
