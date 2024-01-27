"use client";
import { Input } from "@ui/components/shadcn/input";
import { SearchDataTable } from "../data-table/SearchDataTable";
import type { EventsPaginated } from "@repo/types";
import { eventColumn } from "../data-table/columns/EventColumn";
import { useTableSection } from "@/lib/hooks/useTableSection";

const EventsTableSection = ({ data }: { data: EventsPaginated }) => {
  const { search, setSearch } = useTableSection("");

  const { content, ...utils } = data;

  return (
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
  );
};
export default EventsTableSection;
