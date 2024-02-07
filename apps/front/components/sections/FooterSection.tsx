import Link from 'next/link';
import React from 'react';
import { socialMedia } from '@repo/utils/constants';
import { cn } from '@repo/utils';

interface Props extends React.ComponentPropsWithoutRef<'footer'> {}

function FooterSection({ className, ...props }: Props) {
  return (
    <footer className={cn('pb-12', className)} {...props}>
      <div className="flex flex-col md:flex-row justify-between gap-8 ">
        <div>
          <p>
            <img src="/images/logo-bottom.png" alt="footer logo" />
          </p>
          <p className="text-lightGray mt-[1.19rem]">
            Book your trip in minute, get full Control for much longer.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {socialMedia.map(({ icon, name, url }) => (
            <Link href={url} key={name} target="_blank">
              <img src={icon} alt={name} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
