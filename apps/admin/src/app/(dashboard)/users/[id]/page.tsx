import HeadingWithAction from "@/components/HeadingWithAction";
import UpdateUserForm from "@/components/forms/UpdateUserForm";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

const UserPage = async ({ params: { id } }: { params: { id: string } }) => {
  let user = null;
  try {
    user = await api.user.getById.query({ id });
  } catch (error) {
    console.error("UserPage", error);
    notFound();
  }
  if (!user) notFound();

  return (
    <>
      <HeadingWithAction heading="User Details" href="/users" label="Users" />

      <main className="rounded-lg border p-6 shadow-md">
        <UpdateUserForm user={user} />
      </main>
    </>
  );
};

export default UserPage;
