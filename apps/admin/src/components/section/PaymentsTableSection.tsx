"use client";
import { Input } from "@ui/components/shadcn/input";
import { SearchDataTable } from "../data-table/SearchDataTable";
import { Suspense } from "react";
import type { PaymentsPaginated } from "@repo/types";
import { paymentColumn } from "../data-table/columns/PaymentColumn";
import { useTableSection } from "@/lib/hooks/useTableSection";

const PaymentsTableSection = ({ data }: { data: PaymentsPaginated }) => {
  const { search, setSearch } = useTableSection("");

  const { content, ...utils } = data;

  return (
    <Suspense fallback={null}>
      <SearchDataTable
        data={content}
        columns={paymentColumn}
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
export default PaymentsTableSection;
