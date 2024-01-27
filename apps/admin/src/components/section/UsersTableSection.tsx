"use client";
import { Input } from "@ui/components/shadcn/input";
import { SearchDataTable } from "../data-table/SearchDataTable";
import type { UsersPaginated } from "@repo/types";
import { userColumn } from "../data-table/columns/UserColumn";
import { useTableSection } from "@/lib/hooks/useTableSection";

const UsersTableSection = ({ data }: { data: UsersPaginated }) => {
  const { search, setSearch } = useTableSection("");

  const { content, ...utils } = data;

  return (
    <SearchDataTable
      data={content}
      columns={userColumn}
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
export default UsersTableSection;
