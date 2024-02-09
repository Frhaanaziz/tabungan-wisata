import Image from 'next/image';
import React from 'react';

function LogoGroupSection() {
  return (
    <div className="w-full flex justify-center">
      <Image
        src="/images/logo-group.png"
        alt="logo group"
        width={1073}
        height={308}
      />
    </div>
  );
}

export default LogoGroupSection;
