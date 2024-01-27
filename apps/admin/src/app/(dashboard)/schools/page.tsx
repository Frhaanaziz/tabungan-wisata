import SchoolsTableSection from "@/components/section/SchoolsTableSection";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ui/components/shadcn/dialog";

import AddSchoolForm from "@/components/forms/AddSchoolForm";
import { buttonVariants } from "@ui/components/shadcn/button";
import { api } from "@/trpc/server";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";

const SchoolsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const search = (searchParams.search as string) || "";
  const data = await api.school.getAllPaginated.query({
    page: parseInt(page),
    search,
  });

  return (
    <>
      <header className="mb-4 flex items-center justify-between pb-5">
        <h1 className="text-2xl font-semibold leading-6 ">Schools</h1>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Dialog>
            <DialogTrigger className={buttonVariants()}>+ Add</DialogTrigger>
            <DialogContent>
              <AddSchoolForm />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <Suspense fallback={<DataTableSkeleton />}>
        <SchoolsTableSection data={data} />
      </Suspense>
    </>
  );
};

export default SchoolsPage;
