import { getBackendApi } from '@/lib/axios';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@ui/components/shadcn/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/components/shadcn/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Separator } from '@ui/components/shadcn/separator';

import { AspectRatio } from '@ui/components/shadcn/aspect-ratio';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Event } from '@repo/types';
import GoogleMap from '@ui/components/GoogleMap';
import { companyContact, companyEmail } from '@repo/utils/constants';
import BreadCrumbs from '@/components/common/BreadCrumbs';
import SocialShare from '@/components/common/SocialShare';
import RichText from '@/components/common/RichText';
import { MapPinIcon } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const result = await getBackendApi().get('/events/ids');

  return result.data;
}

const EventPage = async ({ params: { id } }: { params: { id: string } }) => {
  let event: Event | null = null;
  try {
    event = (await getBackendApi().get(`/events/${id}`)).data;
  } catch (error) {
    console.error('EventPage', error);
    notFound();
  }
  if (!event) notFound();

  const { images, name, include, exclude, itineraries, highlight } = event;
  const places = itineraries.map((itinerary) => itinerary.name);
  return (
    <>
      <div className="mt-10 border-b border-b-gray-200">
        <div className="flex justify-between items-center container">
          <div className="space-y-3 pb-2 ">
            <p className="text-secondary text-sm font-semibold lg:text-base">
              Event
            </p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold pb-3">
              {name}
            </h1>
            <BreadCrumbs customText={name} className="md:text-base" />
          </div>
          <SocialShare description={highlight} />
        </div>
      </div>
      <main className="container grid-cols-4 gap-10 lg:grid my-20">
        <div className="col-span-3">
          <section>
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {images.map((image, i) => (
                  <CarouselItem key={image.id}>
                    <AspectRatio ratio={16 / 9} className="w-full">
                      <Image
                        src={image.url}
                        className="w-full rounded-xl"
                        priority
                        fill
                        sizes="(min-width: 1536px) 40vw, (min-width: 1280px) 45vw, (min-width: 1024px) 45vw, (min-width: 768px) 50vw, (min-width: 640px) 90vw, 100vw"
                        alt={`${name} - ${i}`}
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="translate-x-16" />
              <CarouselNext className="-translate-x-16" />
            </Carousel>

            <div className="mt-5 flex items-center gap-3 text-sm text-lightGray">
              <MapPinIcon className="h-4 min-h-4 w-4 min-w-4" />{' '}
              <p className="truncate">{places.join(', ')}</p>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-2 space-y-10">
            <div>
              <h2 className="mb-1 text-xl font-medium text-primary">
                Highlights
              </h2>
              <RichText
                content={highlight}
                className="prose-sm prose-li:list-image-[url(/icons/check-circle.svg)]"
              />
            </div>

            <div>
              <h2 className="text-xl font-medium text-primary">Itinerary</h2>
              <Accordion type="single" collapsible>
                {itineraries.map(({ description, name, id }, i) => (
                  <AccordionItem key={id} value={id}>
                    <AccordionTrigger className="text-start">
                      DAY {i + 1} {name}
                    </AccordionTrigger>
                    <AccordionContent asChild>
                      <RichText
                        content={description}
                        className="prose-li:list-image-[url(/icons/check-circle.svg)]"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <div className="my-10 border-l-4 border-primary bg-gray-100 p-4 text-sm text-red-500">
            ** Itinerary dapat disesuaikan dengan Jadwal penerbangan & cuaca
            yang ada
          </div>

          <section className="flex flex-col justify-around gap-10 md:flex-row">
            <div>
              <p className="text-3xl font-bold">Included :</p>
              <div className="my-4 h-0.5 w-24 bg-primary" />
              <RichText
                content={include}
                className="prose-li:list-image-[url(/icons/check-circle.svg)]"
              />
            </div>
            <div>
              <p className="text-3xl font-bold">Excluded :</p>
              <div className="my-4 h-0.5 w-24 bg-primary" />
              <RichText
                content={exclude}
                className="prose-li:list-image-[url(/icons/check-circle.svg)]"
              />
            </div>
          </section>
        </div>

        <aside className="hidden space-y-10 lg:block">
          <GoogleMap />

          <div className="relative flex flex-col">
            <p className="testimonial text-pretty text-sm text-lightGray dark:border-lightGray dark:after:hidden">
              Pada dasarnya kami sebagai pelanggan sangat terbantu dan puas
              dengan respon serta kerjasama yg baik, namun untuk lebih
              meningkatkan kepuasan pelanggan tentunya harus terus semakin lebih
              baik lagi. Demikian dari kami, terima kasih
            </p>

            <div className="flex gap-3">
              <Avatar>
                <AvatarImage
                  src="/images/review-avatar.png"
                  alt="Jane R"
                  width={40}
                  height={40}
                />
                <AvatarFallback>JR</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p>Jane R</p>
                <p className="text-lightGray">
                  PT Kilang Pertamina Internasional
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 rounded-medium border shadow p-7">
            <p className="text-2xl font-semibold">Information Contact</p>
            <div className="space-y-1">
              <p className="font-semibold">Email</p>
              <p className="text-lightGrayAlt2">
                <Link href={`mailto:${companyEmail}`}>{companyEmail}</Link>
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Whatsapp</p>
              <p className="text-lightGrayAlt2">
                <Link href={`https://wa.me/${companyContact}`} target="_blank">
                  +{companyContact}
                </Link>
              </p>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
};

export default EventPage;
