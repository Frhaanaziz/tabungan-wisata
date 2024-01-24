"use client";
import { Input } from "@ui/components/input";
import { SearchDataTable } from "../data-table/SearchDataTable";
import { Suspense, useId, useState } from "react";
import { toast } from "sonner";
import type { PaymentsPaginated } from "@repo/types";
import { api } from "@/trpc/react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { paymentColumn } from "../data-table/columns/PaymentColumn";

const PaymentsTableSection = ({
  page,
  initialData,
  userId,
}: {
  page: number;
  initialData: PaymentsPaginated;
  userId: string;
}) => {
  const toastId = useId();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const debouncedQuery = useDebounce(search);

  api.payment.getAllPaginated.useQuery(
    {
      page,
      search: debouncedQuery,
      userId,
    },
    {
      queryKey: [
        "payment.getAllPaginated",
        { page, search: debouncedQuery, userId },
      ],
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
    <section className="my-20">
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
          emptyState="No transactions."
        />
      </Suspense>
    </section>
  );
};
export default PaymentsTableSection;
