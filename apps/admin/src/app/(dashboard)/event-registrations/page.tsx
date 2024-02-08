import { api } from "@/trpc/server";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";
import { SearchDataTable } from "@/components/data-table/SearchDataTable";
import { EventRegistrationColumn } from "@/components/data-table/columns/EventRegistrationColumn";
import AddEventRegistrationForm from "@/components/forms/AddEventRegistrationForm";

const EventRegistrations = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const search = (searchParams.search as string) || "";
  const data = await api.eventRegistration.getAllPaginated.query({
    page: parseInt(page),
    search,
  });

  const { content, ...utils } = data;

  return (
    <>
      <header className="mb-4 flex items-center justify-between pb-5">
        <h1 className="text-2xl font-semibold leading-6 ">
          Event Registration
        </h1>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <AddEventRegistrationForm />
        </div>
      </header>

      <Suspense fallback={<DataTableSkeleton />}>
        <SearchDataTable
          data={content}
          columns={EventRegistrationColumn}
          utils={utils}
        />
      </Suspense>
    </>
  );
};

export default EventRegistrations;
