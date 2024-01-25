import { Skeleton } from "@ui/components/shadcn/skeleton";

const DataTableSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-9 w-20" />
      </div>

      <div className="mt-[14px] divide-y-2">
        {Array.from({ length: 10 }).map((_, i) => {
          if (i === 0) return <Skeleton key={i} className="h-[52px] w-full" />;

          return <Skeleton key={i} className="h-[65px] w-full rounded-none" />;
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </>
  );
};

export default DataTableSkeleton;
