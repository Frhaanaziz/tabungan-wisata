import React from 'react';
import DestinationCard from '../cards/DestinationCard';
import { getEventsAction } from '@/app/_actions/event';
import { toRupiahSuffix, truncate } from '@repo/utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function TopSellingSection() {
  const { data } = await getEventsAction();
  if (!data) return notFound();

  const events =
    data
      .map((event) => ({
        id: event.id,
        imageUrl: event.images.at(1)?.url ?? '/',
        title: truncate(event.name, 18),
        amount: toRupiahSuffix(event.cost),
        duration: `${event.duration} Days Trip`,
        highlighted: true,
      }))
      .slice(0, 3) ?? [];

  return (
    <section>
      <p className="text-lightGray text-[1.125rem] font-[600] text-center">
        Top Selling
      </p>
      <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
        Top Destinations
      </p>
      <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between mt-16 w-full">
        {events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <DestinationCard
              key={event.id}
              imageUrl={event.imageUrl}
              title={event.title}
              duration={event.duration}
              amount={event.amount}
              highlighted={event.highlighted}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TopSellingSection;
