import HeadingWithAction from "@/components/HeadingWithAction";
import UpdateEventForm from "@/components/forms/UpdateEventForm";
import { api } from "@/trpc/server";

const UpdateEventPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const event = await api.event.getById.query({ id });

  return (
    <>
      <HeadingWithAction heading="Edit Event" href="/events" label="Events" />

      <main className="rounded-lg border p-6">
        <UpdateEventForm event={event} />
      </main>
    </>
  );
};

export default UpdateEventPage;
