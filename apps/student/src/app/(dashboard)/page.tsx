import { getFirstName, greeting, toRupiah } from "@repo/utils";
import { AspectRatio } from "@ui/components/shadcn/aspect-ratio";
import Image from "next/image";
import { checkSessionAction } from "../_actions";
import { api } from "@/trpc/server";
import TopUpButton from "@/components/TopUpButton";
import { redirect } from "next/navigation";
import { DataTable } from "@ui/components/table/data-table";
import { paymentColumn } from "@/components/data-table/columns/PaymentColumn";

export default async function Home() {
  const { data: user } = await checkSessionAction();
  if (!user.schoolId) redirect("/auth/school");

  const [userPayments, userBalance, school] = await Promise.all([
    api.payment.getAll.query({ userId: user.id }),
    api.user.getBalance.query(),
    api.eventRegistration.getBySchoolId.query({ schoolId: user.schoolId }),
  ]);
  const eventsCost = school
    .map(({ event }) => event.cost)
    .reduce((a, b) => a + b, 0);

  return (
    <main className="container">
      <section className="grid-cols-5 items-center space-y-10 md:grid md:space-y-0">
        <div className="order-2 col-span-2">
          <AspectRatio ratio={3 / 2}>
            <Image
              src={"/images/frugality.jpg"}
              alt="frugality"
              priority
              fill
              sizes="50vw"
            />
          </AspectRatio>
        </div>

        <div className="col-span-3">
          <h1 className="text-4xl font-bold md:text-5xl">
            Good {greeting()} {getFirstName(user.name).toLowerCase()},
            <br />
            you have
            <br />
          </h1>
          <p className="my-5 text-4xl font-bold text-green-500">
            {toRupiah(userBalance)}
          </p>
          <p className="mb-4 text-lg">
            Your target balance to participate in the tour:{" "}
            <span className="underline">{toRupiah(eventsCost)}</span>
          </p>
          <TopUpButton userId={user.id} />
        </div>
      </section>

      <section className="mt-20">
        <DataTable
          columns={paymentColumn as any}
          data={userPayments}
          emptyMessage={"No transactions."}
        />
      </section>
    </main>
  );
}
