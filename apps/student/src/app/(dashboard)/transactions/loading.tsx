import { Skeleton } from "@ui/components/shadcn/skeleton";

const LoadingPage = () => {
  return (
    <>
      <div className="container min-h-[calc(100vh-105px-112px)]">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="mb-2 h-[28px] w-[180px]" />
            <Skeleton className="h-[20px] w-[220px]" />
          </div>
          <Skeleton className="h-[40px] w-[80px]" />
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[90px] w-full" />
            ))}
          </div>

          <div className="mt-16">
            <div className="mt-[14px] divide-y-2">
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
      </div>
    </>
  );
};

export default LoadingPage;
