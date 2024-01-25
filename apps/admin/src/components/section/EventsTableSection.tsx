"use client";
import { Input } from "@ui/components/shadcn/input";
import { SearchDataTable } from "../data-table/SearchDataTable";
import { Suspense, useId, useState } from "react";
import { toast } from "sonner";
import type { EventsPaginated } from "@repo/types";
import { api } from "@/trpc/react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { eventColumn } from "../data-table/columns/EventColumn";

const EventsTableSection = ({
  page,
  initialData,
}: {
  page: number;
  initialData: EventsPaginated;
}) => {
  const toastId = useId();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const debouncedQuery = useDebounce(search);

  api.event.getAllPaginated.useQuery(
    {
      page,
      search: debouncedQuery,
    },
    {
      queryKey: ["event.getAllPaginated", { page, search: debouncedQuery }],
      onError(error) {
        toast.error(error.message, { id: toastId });
      },
      onSuccess(data) {
        setData(data);
      },
      initialData,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  const { content, ...utils } = data;

  return (
    <Suspense fallback={null}>
      <SearchDataTable
        data={content}
        columns={eventColumn}
        utils={utils}
        SearchInput={
          <Input
            placeholder="Filter names..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-sm"
          />
        }
      />
    </Suspense>
  );
};
export default EventsTableSection;
