import { api } from "@/trpc/server";

import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";
import { SearchDataTable } from "@/components/data-table/SearchDataTable";
import { eventColumn } from "@/components/data-table/columns/EventColumn";
import HeadingWithAction from "@/components/HeadingWithAction";

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

  const { content, ...utils } = data;

  return (
    <>
      <HeadingWithAction heading="Events" href="/events/add" label="+ Add" />

      <Suspense fallback={<DataTableSkeleton />}>
        <SearchDataTable data={content} columns={eventColumn} utils={utils} />
      </Suspense>
    </>
  );
};

export default EventsPage;
