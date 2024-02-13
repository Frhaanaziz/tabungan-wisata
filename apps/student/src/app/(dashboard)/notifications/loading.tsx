import { Skeleton } from "@ui/components/shadcn/skeleton";

const LoadingPage = () => {
  return (
    <>
      <div className="container min-h-[calc(100vh-105px-112px)]">
        <Skeleton className="mb-2 h-[28px] w-[180px]" />
        <Skeleton className="h-[20px] w-[250px]" />

        <div className="mt-16">
          <div className="divide-y-2">
            {Array.from({ length: 10 }).map((_, i) => {
              if (i === 0)
                return <Skeleton key={i} className="h-[52px] w-full" />;

              return (
                <Skeleton key={i} className="h-[65px] w-full rounded-none" />
              );
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
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
