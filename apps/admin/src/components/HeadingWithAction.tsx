import Link from "next/link";
import { buttonVariants } from "@ui/components/button";
import BreadCrumbs from "./BreadCrumbs";

const HeadingWithAction = ({
  heading,
  href,
  label,
}: {
  heading: string;
  href: string;
  label: string;
}) => {
  return (
    <>
      <BreadCrumbs />
      <header className="mb-4 flex items-center justify-between pb-5">
        <h1 className="text-2xl font-semibold leading-6 ">{heading}</h1>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Link href={href} className={buttonVariants()}>
            {label}
          </Link>
        </div>
      </header>
    </>
  );
};

export default HeadingWithAction;
