import BreadCrumbs from "./BreadCrumbs";

const HeadingNoAction = ({ text }: { text: string }) => {
  return (
    <>
      <BreadCrumbs />
      <div className="mb-4 pb-5 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold leading-6 ">{text}</h1>
      </div>
    </>
  );
};

export default HeadingNoAction;
