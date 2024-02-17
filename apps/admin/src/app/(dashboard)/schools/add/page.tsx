import HeadingWithAction from "@/components/HeadingWithAction";
import AddSchoolForm from "@/components/forms/AddSchoolForm";

const AddSchoolPage = async () => {
  return (
    <>
      <HeadingWithAction heading="Add School" href="/schools" label="Schools" />

      <main className="rounded-lg border p-6 shadow-md">
        <AddSchoolForm />
      </main>
    </>
  );
};

export default AddSchoolPage;
