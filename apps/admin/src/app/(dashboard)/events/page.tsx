import { api } from "@/trpc/server";

import AddEventForm from "@/components/forms/AddEventForm";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";
import { SearchDataTable } from "@/components/data-table/SearchDataTable";
import { eventColumn } from "@/components/data-table/columns/EventColumn";

const EventsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const search = (searchParams.search as string) || "";
  const data = await api.event.getAllPaginated.query({
    page: parseInt(page),
    search,
  });

  const schools = await api.school.getAll.query();

  const { content, ...utils } = data;

  return (
    <>
      <header className="mb-4 flex items-center justify-between pb-5">
        <h1 className="text-2xl font-semibold leading-6 ">Events</h1>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <AddEventForm schools={schools} />
        </div>
      </header>

      <Suspense fallback={<DataTableSkeleton />}>
        <SearchDataTable data={content} columns={eventColumn} utils={utils} />
      </Suspense>
    </>
  );
};

export default EventsPage;
