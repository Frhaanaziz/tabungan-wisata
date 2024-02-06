'use client';
import { cn } from '@repo/utils';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

function isCUID(id: string) {
  return id.length === 25 && id.startsWith('c');
}

interface Props extends React.ComponentPropsWithoutRef<'nav'> {}

const BreadCrumbs = ({ className, ...restProps }: Props) => {
  const pathName = usePathname();
  const pathNameArray = pathName.split('/').splice(1);

  //   if (pathNameArray.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('pb-4', className)}
      {...restProps}
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link href={'/'} className="font-semibold">
            Home
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="h-4 w-4" />
        </li>
        {pathNameArray.map((item, index) => {
          const path = `/${pathNameArray.slice(0, index + 1).join('/')}`;
          const label = isCUID(item) ? '...' : item;

          if (index === pathNameArray.length - 1)
            return (
              <li key={item}>
                <Link className="capitalize text-lightGrayAlt" href={path}>
                  {label}
                </Link>
              </li>
            );

          return (
            <Fragment key={item}>
              <li>
                <Link
                  className="capitalize transition hover:text-lightGrayAlt"
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
