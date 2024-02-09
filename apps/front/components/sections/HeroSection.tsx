import React from 'react';
import MainButton from '../common/MainButton';
import Link from 'next/link';
import { companyContact, companyVideoUrl } from '@repo/utils/constants';
import Image from 'next/image';

function HeroSection() {
  return (
    <section className="flex justify-between items-center mt-16 md:z-[9999]">
      <div className=" sm:pt-16 md:pt-4">
        <p className="text-[1.128rem] font-[700] text-primary uppercase mb-4">
          Best Destinations around the world
        </p>
        <div className="flex flex-col">
          <div className="volkhov font-[700] text-[3rem] md:text-[4.73756rem] leading-large inline-flex text-lightBlue">
            Travel,
            <div className="flex  flex-col">
              <span className="ml-8 z-10">enjoy</span>
              <Image
                src="/images/stylish-underline.png"
                alt="stylish underline"
                width={704}
                height={724}
                className="-mt-4 z-0 hidden md:block"
              />
            </div>
          </div>

          <p className="volkhov font-[700] text-[3rem] md:text-[4.73756rem] leading-large inline-flex text-lightBlue">
            and live a new and full life
          </p>
        </div>

        <p className="my-[1.6rem] font-bold leading-[1.692rem] text-lightGray text-[1rem]">
          Built Wicket longer admire do barton vanity itself do in it. Preferred
          to sportsmen it engrossed listening. Park gate sell they west hard for
          the.
        </p>

        <div className="flex gap-6 items-center ">
          <Link href={`https://wa.me/${companyContact}`} target="_blank">
            <MainButton
              text="Find out more"
              classes="bg-secondary text-white font-[600] shadow-none rounded-[0.564rem] border-none hover:bg-secondary  w-[9.58788rem] h-[3rem]"
            />
          </Link>
          <Link
            href={companyVideoUrl}
            target="_blank"
            className="flex items-center mt-6 hover:cursor-pointer"
          >
            <Image
              src="/images/play-shadow.png"
              width={102}
              height={102}
              alt="rounded play icon with shadow"
            />
            <p className="text-lightGrayAlt -mt-6">Play Demo</p>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          src="/images/lady-with-aircraft.png"
          width={784}
          height={764}
          alt="girl with phone with aircrafts on the background"
        />
      </div>
    </section>
  );
}

export default HeroSection;
