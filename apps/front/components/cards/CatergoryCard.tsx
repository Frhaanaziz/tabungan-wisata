import Image from 'next/image';
import React from 'react';

interface IProps {
  iconUrl: string;
  title: string;
  description: string;
  highlighted: boolean;
}

function CatergoryCard({ iconUrl, title, description, highlighted }: IProps) {
  return (
    <div
      className={`flex relative flex-col gap-4 items-center p-[2.5rem] ${
        highlighted ? 'bg-white shadow-md rounded-[2.5rem]' : ''
      }`}
    >
      <Image
        src={iconUrl}
        alt="category card icon"
        width={80}
        height={80}
        sizes="30vw"
      />
      <p className="text-subtitle text-[1.2rem] font-[600]">{title}</p>
      <p className="text-lightGray text-[1rem] font-bold text-balance text-center">
        {description}
      </p>
      {highlighted && (
        <div className="absolute -bottom-8 -left-10 -z-10">
          <Image
            src="/images/rectangle-shape.png"
            alt="rectangle shape"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
}

export default CatergoryCard;
