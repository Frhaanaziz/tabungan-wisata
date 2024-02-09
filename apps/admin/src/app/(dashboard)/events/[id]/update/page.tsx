import HeadingWithAction from "@/components/HeadingWithAction";
import UpdateEventForm from "@/components/forms/UpdateEventForm";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

const UpdateEventPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  let event = null;
  try {
    event = await api.event.getById.query({ id });
  } catch (error) {
    console.error("UpdateEventPage", error);
    notFound();
  }
  if (!event) notFound();

  return (
    <>
      <HeadingWithAction heading="Edit Event" href="/events" label="Events" />

      <main className="rounded-lg border p-6 shadow-md">
        <UpdateEventForm event={event} />
      </main>
    </>
  );
};

export default UpdateEventPage;
