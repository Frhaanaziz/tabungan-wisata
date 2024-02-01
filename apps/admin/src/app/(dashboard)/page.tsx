import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/shadcn/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui/components/shadcn/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ui/components/shadcn/avatar";
import Overview from "@/components/Overview";
import SignOutButton from "@/components/SignOutButton";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { api } from "@/trpc/server";
import { getInitials, toRupiah } from "@repo/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const totalUsers = await api.user.getTotalUsers.query();
  const totalUserOneMonth = await api.user.getCountNewUsers.query({ days: 30 });
  const totalTransactionOneMonth = await api.payment.getCountNewPayments.query({
    days: 30,
  });
  const totalEventsOneMonth = await api.event.getCountNewEvents.query({
    days: 30,
  });
  const eventGrowth = await api.event.getGrowthPercentage.query();
  const userGrowth = await api.user.getGrowthPercentage.query();
  const revenueGrowth = await api.payment.getGrowthPercentage.query();
  const revenueOneMonth = await api.payment.getRevenue.query({ days: 30 });
  const usersGrowthCount = await api.user.getGrowthCount.query({ days: 7 });
  const recentTransactions = await api.payment.getCompletedPayments.query({
    take: 5,
  });

  return (
    <>
      <header className="flex items-center justify-between pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <SignOutButton />
        </div>
      </header>
      <main className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4">
          <div className="flex items-center space-x-2">
            {/* <CalendarDateRangePicker /> */}
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      +{userGrowth.toFixed(2)}% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{toRupiah(revenueOneMonth)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{revenueGrowth.toFixed(2)}% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Events
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{totalEventsOneMonth}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{eventGrowth.toFixed(2)}% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      New Users
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{totalUserOneMonth}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{usersGrowthCount} since last week
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Student made {totalTransactionOneMonth} transaction this
                      month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {recentTransactions.map(({ user, amount, id }) => (
                        <div key={id} className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={user?.image ?? "/"}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                          <div className="ml-auto font-medium">
                            +{toRupiah(amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
