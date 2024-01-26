import { api } from "@/trpc/server";
import HeadingNoAction from "@/components/HeadingNoAction";
import { DataTable } from "@ui/components/table/data-table";
import { paymentColumn } from "@/components/data-table/columns/PaymentColumn";

export const dynamic = "force-dynamic";

const PaymentsPage = async () => {
  const data = await api.payment.getAll.query();

  return (
    <>
      <HeadingNoAction text="Payments" />

      {/* <PaymentsTableSection page={parseInt(page)} initialData={initialData} /> */}
      <DataTable columns={paymentColumn} data={data} searchBy="name" />
    </>
  );
};

export default PaymentsPage;
