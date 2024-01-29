import AddSchoolForm from "@/components/forms/AddSchoolForm";
import { api } from "@/trpc/server";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";
import { SearchDataTable } from "@/components/data-table/SearchDataTable";
import { schoolColumns } from "@/components/data-table/columns/SchoolColumn";

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
      <header className="mb-4 flex items-center justify-between pb-5">
        <h1 className="text-2xl font-semibold leading-6 ">Schools</h1>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <AddSchoolForm />
        </div>
      </header>

      <Suspense fallback={<DataTableSkeleton />}>
        <SearchDataTable data={content} columns={schoolColumns} utils={utils} />
      </Suspense>
    </>
  );
};

export default SchoolsPage;
