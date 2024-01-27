import HeadingNoAction from "@/components/HeadingNoAction";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";
import { api } from "@/trpc/server";
import { SearchDataTable } from "@/components/data-table/SearchDataTable";
import { userColumn } from "@/components/data-table/columns/UserColumn";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const search = (searchParams.search as string) || "";

  const data = await api.user.getAllPaginated.query({
    page: parseInt(page),
    search,
  });

  const { content, ...utils } = data;

  return (
    <>
      <HeadingNoAction text="Users" />

      <Suspense fallback={<DataTableSkeleton />}>
        <SearchDataTable data={content} columns={userColumn} utils={utils} />
      </Suspense>
    </>
  );
};

export default UsersPage;
