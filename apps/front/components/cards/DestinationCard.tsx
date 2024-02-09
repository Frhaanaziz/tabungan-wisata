import { SendIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface IProps {
  imageUrl: string;
  title: string;
  amount: string;
  duration: string;
  highlighted: boolean;
}

function DestinationCard({
  imageUrl,
  title,
  amount,
  duration,
  highlighted,
}: IProps) {
  return (
    <div className="flex relative flex-col justify-between  pb-[2.63rem] group">
      <div className="object-fill">
        <Image
          src={imageUrl}
          alt="destination image"
          width={400}
          height={326}
          className="w-[400px] h-[20.43rem]  object-cover rounded-t-[1.5rem]"
        />
      </div>
      <div className="bg-white w-full mt-[1.69rem] px-[1.62rem]  group-hover:shadow-md pb-[2rem] group-hover:rounded-[1.5rem]">
        <div className="flex justify-between text-lightGray text-[1.125rem] font-bold">
          <p>{title}</p>
          <p>{amount}</p>
        </div>
        <div className="flex gap-4 items-center">
          <SendIcon size={18} />
          <p className="text-lightGray font-bold">{duration}</p>
        </div>
      </div>
      {highlighted && (
        <div className="absolute bottom-[5rem] right-[-4rem] -z-10 hidden md:block">
          <Image
            src="/images/stylish-ring.png"
            alt="curly ring"
            width={98}
            height={254}
          />
        </div>
      )}
    </div>
  );
}

export default DestinationCard;
