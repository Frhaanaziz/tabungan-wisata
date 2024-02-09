import HeadingSection from '@/components/sections/HeadingSection';
import { teamMembers } from '@repo/utils/constants';
import { AspectRatio } from '@ui/components/shadcn/aspect-ratio';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Since 2013, we have offered group backpacking tours through the most alluring destinations in Southeast Asia!`,
};

const AboutPage = () => {
  return (
    <>
      <HeadingSection
        heading="About Us"
        image="/images/bg-about-top.png"
        subHeading="We're Travel Agency"
      />

      <main className="my-20 container">
        <p className="text-xl md:text-2xl font-semibold text-center">
          Since 2013, we have offered group backpacking tours through the most
          alluring destinations in Southeast Asia!
        </p>

        <section className="md:grid grid-cols-2 gap-32 mt-16 items-center">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={'/images/about-section-1.png'}
              alt="happy-traveller"
              fill
              sizes="100vw"
            />
          </AspectRatio>
          <div className="flex flex-col gap-8">
            <h3 className="text-xl font-semibold py-3 md:text-2xl lg:text-3xl">
              Why Choose Us
            </h3>
            <div className="flex items-center gap-4">
              <Image
                src={'/icons/bed-sleep-purple.png'}
                alt="money-smartphone"
                width={40}
                height={40}
              />
              <p>SLEEP & TRAVEL IN COMFORT</p>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src={'/icons/money-smartphone.png'}
                alt="money-smartphone"
                width={40}
                height={40}
              />
              <p>BOOKING WITH SPREAD PAYMENTS</p>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src={'/icons/green-document.png'}
                alt="money-smartphone"
                width={40}
                height={40}
              />
              <p>FULLY LICENSED TOUR OPERATOR</p>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-10 md:grid grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="relative after:absolute after:content-wavy-underline-green after:left-0 after:top-12 text-xl font-semibold py-3 md:text-2xl lg:text-3xl">
              Continuity Of Quality
            </h3>
            <p className="text-lightGrayAlt2 pt-14  text-balance">
              Each tour is handcrafted by our team after months (sometimes
              years!) of in-country research. We carefully select each activity,
              transportation, accommodation, and included meal option to ensure
              a consistent level of quality on each tour.
            </p>
          </div>
          <AspectRatio ratio={4 / 3}>
            <Image
              src={'/images/about-section-2.png'}
              alt="happy-traveller"
              fill
              sizes="100vw"
            />
          </AspectRatio>
        </section>

        <section className="mt-16 space-y-10 md:grid grid-cols-2 gap-10 items-center">
          <div className="order-2">
            <h3 className="relative after:absolute after:content-wavy-underline after:left-0 after:top-12 text-xl font-semibold py-3 md:text-2xl lg:text-3xl">
              Clean, Cushy Accommodation
            </h3>
            <p className="text-lightGrayAlt2 pt-10 text-balance">
              Accommodation makes or breaks a trip! You have access to a hotel
              pool or a beach nearby most days on tour. Most nights, you share a
              room with just one other group member. The select dorm-style
              options included are ultra-comfy, extra clean, and uber-unique.
            </p>
          </div>
          <AspectRatio ratio={4 / 3}>
            <Image
              src={'/images/about-section-3.png'}
              alt="happy-traveller"
              fill
              sizes="100vw"
            />
          </AspectRatio>
        </section>

        <section className="mt-16">
          <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl md:text-center">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 mt-8 lg:mt-12">
            {teamMembers.map(({ image, name, position, socialMedia }, i) => (
              <div key={i}>
                <AspectRatio
                  ratio={1 / 1}
                  className="overflow-hidden rounded-medium"
                >
                  <Link href={socialMedia}>
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="100vw"
                      className="hover:scale-110 transition-transform duration-300 ease-in-out"
                    />
                  </Link>
                </AspectRatio>
                <p className="text-xl font-semibold text-center mt-4">{name}</p>
                <p className="text-sm font-semibold text-center">{position}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
