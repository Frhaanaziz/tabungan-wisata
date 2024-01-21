"use client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

function isCUID(id: string) {
  return id.length === 25 && id.startsWith("c");
}

const BreadCrumbs = () => {
  const pathName = usePathname();
  const pathNameArray = pathName.split("/").splice(1);

  if (pathNameArray.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="pb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {pathNameArray.map((item, index) => {
          const path = `/${pathNameArray.slice(0, index + 1).join("/")}`;
          const label = isCUID(item) ? "..." : item;

          if (index === pathNameArray.length - 1)
            return (
              <li key={item}>
                <Link className="capitalize  text-foreground" href={path}>
                  {label}
                </Link>
              </li>
            );

          return (
            <Fragment key={item}>
              <li>
                <Link
                  className="capitalize transition hover:text-foreground"
                  href={path}
                >
                  {label}
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="h-4 w-4" />
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
