import { api } from "@/trpc/server";
import UsersTableSection from "@/components/section/UsersTableSection";
import HeadingNoAction from "@/components/HeadingNoAction";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const search = (searchParams.search as string) || "";
  const data = await api.user.getAllPaginated.query({
    page: parseInt(page),
    search,
  });

  return (
    <>
      <HeadingNoAction text="Users" />

      <Suspense fallback={<DataTableSkeleton />}>
        <UsersTableSection data={data} />
      </Suspense>
    </>
  );
};

export default UsersPage;
