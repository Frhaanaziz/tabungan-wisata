"use client";
import { Input } from "@ui/components/shadcn/input";
import { SearchDataTable } from "../data-table/SearchDataTable";
import type { SchoolsPaginated } from "@repo/types";
import { schoolColumns } from "../data-table/columns/SchoolColumn";
import { useTableSection } from "@/lib/hooks/useTableSection";

const SchoolsTableSection = ({ data }: { data: SchoolsPaginated }) => {
  const { search, setSearch } = useTableSection("");

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
