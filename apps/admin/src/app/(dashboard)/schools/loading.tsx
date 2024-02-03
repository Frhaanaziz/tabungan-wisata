import DataTableSkeleton from "@/components/skeleton/DataTableSkeleton";
import HeadingSkeleton from "@/components/skeleton/HeadingSkeleton";

const Loading = () => {
  return (
    <>
      <HeadingSkeleton />
      <DataTableSkeleton />
    </>
  );
};

export default Loading;
