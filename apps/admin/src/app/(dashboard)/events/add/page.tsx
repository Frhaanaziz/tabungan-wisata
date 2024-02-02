import HeadingWithAction from "@/components/HeadingWithAction";
import AddEventForm from "@/components/forms/AddEventForm";

const AddEventPage = async () => {
  return (
    <>
      <HeadingWithAction heading="Add Event" href="/events" label="Events" />

      <main className="rounded-lg border p-6">
        <AddEventForm />
      </main>
    </>
  );
};

export default AddEventPage;
