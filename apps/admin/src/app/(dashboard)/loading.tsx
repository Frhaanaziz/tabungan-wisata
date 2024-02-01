import { Skeleton } from "@ui/components/shadcn/skeleton";

const Loading = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <Skeleton className="h-[36px] w-[155px]" />
        <Skeleton className="h-[40px] w-[87px]" />
      </div>

      <div className="space-y-4 pt-4">
        <Skeleton className="h-[40px] w-[180px] p-4" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[126px]" />
          <Skeleton className="h-[126px]" />
          <Skeleton className="h-[126px]" />
          <Skeleton className="h-[126px]" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="col-span-4 h-[448px]" />
          <Skeleton className="col-span-3 h-[448px]" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
