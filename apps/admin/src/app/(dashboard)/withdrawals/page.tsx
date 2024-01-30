import { api } from "@/trpc/server";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";
import { SearchDataTable } from "@/components/data-table/SearchDataTable";
import { withdrawalColumn } from "@/components/data-table/columns/WithdrawalColumn";
import HeadingWithAction from "@/components/HeadingWithAction";

const WithdrawalsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const search = (searchParams.search as string) || "";
  const data = await api.withdrawal.getAllPaginated.query({
    page: parseInt(page),
    search,
  });

  const { content, ...utils } = data;

  return (
    <>
      <HeadingWithAction
        heading="Withdrawals"
        href="/withdrawals/add"
        label="+ Add"
      />

      <Suspense fallback={<DataTableSkeleton />}>
        <SearchDataTable
          data={content}
          columns={withdrawalColumn}
          utils={utils}
        />
      </Suspense>
    </>
  );
};

export default WithdrawalsPage;
