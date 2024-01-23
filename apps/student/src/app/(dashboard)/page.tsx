import { getFirstName, greeting } from "@repo/utils";
import { AspectRatio } from "@ui/components/ui/aspect-ratio";
import { Button } from "@ui/components/ui/button";
import Image from "next/image";
import { checkSessionAction } from "../_actions";
import { api } from "@/trpc/server";
import PaymentsTableSection from "@/components/section/PaymentsTableSection";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data: user } = await checkSessionAction();
  const page = (searchParams.page as string) || "1";
  const initialData = await api.payment.getAllPaginated.query({
    page: parseInt(page),
    userId: user.id,
  });

  return (
    <main className="container">
      <section className="mt-10 grid grid-cols-5 items-center">
        <div className="col-span-3">
          <h1 className="text-5xl font-bold">
            Good {greeting()} {getFirstName(user.name).toLowerCase()},
            <br />
            you have
            <br />
          </h1>
          <p className="my-5 text-4xl font-bold text-green-500">$2,920.56</p>
          <p className="mb-4 text-lg">
            Your target to go to the tour:{" "}
            <span className="underline">$3,000.00</span>
          </p>
          <Button>Topup</Button>
        </div>

        <div className="col-span-2">
          <AspectRatio ratio={3 / 2}>
            <Image src={"/images/frugality.jpg"} alt="frugality" fill />
          </AspectRatio>
        </div>
      </section>

      <PaymentsTableSection
        initialData={initialData}
        userId={user.id}
        page={parseInt(page)}
      />
    </main>
  );
}
