import { api } from "@/trpc/server";
import EventsTableSection from "@/components/section/EventsTableSection";

import AddEventForm from "@/components/forms/AddEventForm";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";

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

  return (
    <>
      <header className="mb-4 flex items-center justify-between pb-5">
        <h1 className="text-2xl font-semibold leading-6 ">Events</h1>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <AddEventForm schools={schools} />
        </div>
      </header>

      <Suspense fallback={<DataTableSkeleton />}>
        <EventsTableSection data={data} />
      </Suspense>
    </>
  );
};

export default EventsPage;
