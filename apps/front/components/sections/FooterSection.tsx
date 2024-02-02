import Link from 'next/link';
import React from 'react';
import { socialMedia } from '@repo/utils/constants';

function FooterSection() {
  return (
    <footer className="mb-12">
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
            <Link href={url} key={name}>
              <img src={icon} alt={name} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
