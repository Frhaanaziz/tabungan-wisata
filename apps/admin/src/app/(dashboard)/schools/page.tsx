import { api } from "@/trpc/server";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";
import { SearchDataTable } from "@/components/data-table/SearchDataTable";
import { schoolColumns } from "@/components/data-table/columns/SchoolColumn";
import HeadingWithAction from "@/components/HeadingWithAction";

const SchoolsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const search = (searchParams.search as string) || "";
  const data = await api.school.getAllPaginated.query({
    page: parseInt(page),
    search,
  });

  const { content, ...utils } = data;

  return (
    <>
      <HeadingWithAction heading="Schools" href="/schools/add" label="+ Add" />

      <Suspense fallback={<DataTableSkeleton />}>
        <SearchDataTable data={content} columns={schoolColumns} utils={utils} />
      </Suspense>
    </>
  );
};

export default SchoolsPage;
