"use client";
import { Input } from "@ui/components/input";
import { SearchDataTable } from "../data-table/SearchDataTable";
import { useId, useState } from "react";
import { toast } from "sonner";
import type { SchoolsPaginated } from "@repo/types";
import { schoolColumns } from "../data-table/columns/SchoolColumn";
import { api } from "@/trpc/react";
import { useDebounce } from "@/lib/hooks/useDebounce";

const SchoolsTableSection = ({
  page,
  initialData,
}: {
  page: number;
  initialData: SchoolsPaginated;
}) => {
  const toastId = useId();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const debouncedQuery = useDebounce(search);

  api.school.getAllPaginated.useQuery(
    {
      page,
      search: debouncedQuery,
    },
    {
      onSuccess(data) {
        setData(data);
      },
      onError(error) {
        toast.error(error.message, { id: toastId });
      },
      initialData,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  const { content, ...utils } = data;

  return (
    <SearchDataTable
      data={content}
      columns={schoolColumns}
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
export default SchoolsTableSection;
