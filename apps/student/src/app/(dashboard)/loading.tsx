import { Skeleton } from "@ui/components/shadcn/skeleton";

const LoadingPage = () => {
  return (
    <div className="container grid min-h-[calc(100vh-105px-112px)] max-w-[1600px] grid-cols-1 gap-10 xl:grid-cols-5">
      <div className="space-y-10 xl:col-span-2">
        <Skeleton className="mb-5 h-[28px] w-[125px]" />

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[104px] w-full" />
          ))}
        </div>

        <div className="space-y-2">
          <Skeleton className="h-[25px] w-[120px]" />
          <div className="flex items-end justify-between">
            <Skeleton className="h-[40px] w-[263px]" />
            <Skeleton className="h-[40px] w-[121px]" />
          </div>
        </div>

        <Skeleton className="h-[124px] w-full" />

        <Skeleton className="h-[208px] w-full" />
      </div>

      <section className="space-y-10 xl:col-span-3">
        <Skeleton className="h-[410px] w-full" />

        {/* Data table skeleton */}
        <>
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-9 w-20" />
          </div>

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
        </>
      </section>
    </div>
  );
};

export default LoadingPage;
