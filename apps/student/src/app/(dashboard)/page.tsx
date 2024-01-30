import { getFirstName, greeting, toRupiah } from "@repo/utils";
import { AspectRatio } from "@ui/components/shadcn/aspect-ratio";
import Image from "next/image";
import { checkSessionAction } from "../_actions";
import { api } from "@/trpc/server";
import TopUpButton from "@/components/TopUpButton";
import { notFound } from "next/navigation";
import { DataTable } from "@ui/components/table/data-table";
import { paymentColumn } from "@/components/data-table/columns/PaymentColumn";

export default async function Home() {
  const { data: user } = await checkSessionAction();
  if (!user.schoolId) notFound();

  const data = await api.payment.getAll.query({
    userId: user.id,
  });

  const eventsCost = (
    await api.school.getEvents.query({ id: user.schoolId })
  ).reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <main className="container">
      <section className="mt-10 grid-cols-5 items-center space-y-10 md:grid md:space-y-0">
        <div className="order-2 col-span-2">
          <AspectRatio ratio={3 / 2}>
            <Image src={"/images/frugality.jpg"} alt="frugality" fill />
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
            {toRupiah(user.balance)}
          </p>
          <p className="mb-4 text-lg">
            Your target balance to participate in the tour:{" "}
            <span className="underline">{toRupiah(eventsCost)}</span>
          </p>
          <TopUpButton userId={user.id} />
        </div>
      </section>

      <section className="my-20">
        <DataTable columns={paymentColumn} data={data} />
      </section>
      {/* <PaymentsTableSection
        initialData={initialData}
        userId={user.id}
        page={parseInt(page)}
      /> */}
    </main>
  );
}
