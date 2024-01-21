import { api } from "@/trpc/server";
import UsersTableSection from "@/components/section/UsersTableSection";
import HeadingNoAction from "@/components/HeadingNoAction";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const initialData = await api.user.getAllPaginated.query({
    page: parseInt(page),
  });

  return (
    <>
      <HeadingNoAction text="Users" />

      <UsersTableSection page={parseInt(page)} initialData={initialData} />
    </>
  );
};

export default UsersPage;
