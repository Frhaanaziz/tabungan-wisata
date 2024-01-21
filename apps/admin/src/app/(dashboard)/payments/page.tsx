import { api } from "@/trpc/server";
import HeadingNoAction from "@/components/HeadingNoAction";
import PaymentsTableSection from "@/components/section/PaymentsTableSection";

const PaymentsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const initialData = await api.payment.getAllPaginated.query({
    page: parseInt(page),
  });

  return (
    <>
      <HeadingNoAction text="Payments" />

      <PaymentsTableSection page={parseInt(page)} initialData={initialData} />
    </>
  );
};

export default PaymentsPage;
