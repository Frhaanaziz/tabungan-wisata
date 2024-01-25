import SchoolsTableSection from "@/components/section/SchoolsTableSection";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ui/components/shadcn/dialog";

import AddSchoolForm from "@/components/forms/AddSchoolForm";
import { buttonVariants } from "@ui/components/shadcn/button";
import { api } from "@/trpc/server";

const SchoolsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const initialData = await api.school.getAllPaginated.query({
    page: parseInt(page),
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

      <SchoolsTableSection page={parseInt(page)} initialData={initialData} />
    </>
  );
};

export default SchoolsPage;
