import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useTableSection = (initialSearch: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const debouncedQuery = useDebounce(search);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    router.replace(
      pathname + "?" + createQueryString("search", debouncedQuery),
      { scroll: false },
    );
  }, [createQueryString, pathname, router, debouncedQuery]);

  return {
    search,
    setSearch,
  };
};
