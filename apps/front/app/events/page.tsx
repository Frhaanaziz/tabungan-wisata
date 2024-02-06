import { notFound } from 'next/navigation';
import { getEventsPaginatedAction } from '../_actions/event';
import { toRupiahSuffix, truncate } from '@repo/utils';
import Image from 'next/image';
import { AspectRatio } from '@ui/components/shadcn/aspect-ratio';
import { Separator } from '@ui/components/shadcn/separator';
import { CalendarDaysIcon, CoinsIcon } from 'lucide-react';
import Link from 'next/link';
import BreadCrumbs from '@/components/common/BreadCrumbs';
import Pagination from '@/components/common/Pagination';
import FilterAccordion from '@/components/common/FilterAccordion';
import MainButton from '@/components/common/MainButton';

const EventsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || '1';
  const costLTE = (searchParams.costLTE as string) || '';
  const costGTE = (searchParams.costGTE as string) || '';
  const durationLTE = (searchParams.durationLTE as string) || '';
  const durationGTE = (searchParams.durationGTE as string) || '';

  const { data } = await getEventsPaginatedAction({
    page: parseInt(page),
    take: 6,
    costLTE: costLTE ? parseInt(costLTE) : undefined,
    costGTE: costGTE ? parseInt(costGTE) : undefined,
    durationLTE: durationLTE ? parseInt(durationLTE) : undefined,
    durationGTE: durationGTE ? parseInt(durationGTE) : undefined,
  });
  if (!data) return notFound();

  const { content: eventsData, ...paginationUtils } = data;

  const events = eventsData.map((event) => ({
    id: event.id,
    imageUrl: event.images.at(1)?.url ?? '/',
    title: truncate(event.name, 100),
    amount: toRupiahSuffix(event.cost),
    duration: `${event.duration} Days Trip`,
    highlighted: true,
  }));

  return (
    <main className="">
      <section className="relative bg-white bg-center bg-no-repeat bg-cover bg-[url('/images/bg-events-top.png')]">
        <div className="container flex pt-10 gap-5 xl:gap-10 min-h-[250px] lg:min-h-[270px] xl:min-h-[300px] 2xl:min-h-[330px] flex-col">
          <BreadCrumbs className="hidden sm:block" />
          <div className="flex flex-col">
            <h1 className="mb-2 font-caveat font-semibold text-[#36bca1] text-lg xl:text-xl">
              Event listing
            </h1>
            <p className="text-3xl font-bold relative after:absolute after:content-wavy-underline after:left-0 after:top-20 after:sm:top-10 lg:text-4xl">
              Pick Your Best Experience
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 container lg:grid grid-cols-3 gap-10">
        <div className=" lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-5">
            {events.length} TOURS FOUND
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5">
            {events.length ? (
              events.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <div className="p-5 shadow-md rounded-medium">
                    <AspectRatio ratio={3 / 2}>
                      <Image
                        className="object-cover rounded-medium"
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                      />
                    </AspectRatio>
                    <h3 className="text-lg font-bold my-3 tracking-wide">
                      {event.title}
                    </h3>
                    <p className="text-lightGrayAlt2 leading-snug">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Saepe laborum consequuntur vero quod tempora alias qui,
                      sint id, quae nobis nulla, fugiat accusamus amet
                      voluptatibus quo rem architecto impedit autem.
                    </p>

                    <Separator className="my-8 bg-gray-200 p-[0.5px]" />

                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <CalendarDaysIcon className="text-primary w-7 h-7 mt-1" />
                        <div className="flex flex-col">
                          <p className="font-semibold">Duration</p>
                          <p className="text-lightGrayAlt2 ">
                            {event.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 ">
                        <CoinsIcon className="text-primary w-7 h-7 mt-1" />
                        <div className="flex flex-col">
                          <p className="font-semibold">Start from</p>
                          <p className="text-lightGrayAlt2 ">{event.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex justify-center items-center flex-col col-span-2">
                <Image
                  src="/images/empty-box.svg"
                  alt="empty-events"
                  width={300}
                  height={300}
                />
                <h3 className="font-bold text-lg">Sorry no results found</h3>
                <p className="my-4 text-balance text-center">
                  Click here to clear filters and perform a fresh search
                </p>
                <Link href="/events" scroll={false}>
                  <MainButton text="Refresh Filter" />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <h2 className="text-2xl font-semibold mb-5">FILTER BY</h2>
          <FilterAccordion />
        </div>
      </section>

      <Pagination {...paginationUtils} />
    </main>
  );
};

export default EventsPage;
