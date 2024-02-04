import React from 'react';
import DestinationCard from '../cards/DestinationCard';
import { getEventsAction } from '@/app/_actions/event';
import { toRupiahSuffix, truncate } from '@repo/utils';
import { notFound } from 'next/navigation';

async function TopSellingSection() {
  const { data: events } = await getEventsAction();
  if (!events) return notFound();

  const destinations =
    events
      .map((event) => ({
        id: event.id,
        imageUrl: event.images.at(1)?.url ?? '/',
        title: truncate(event.name, 18),
        amount: toRupiahSuffix(event.cost),
        duration: `${event.duration} Days Trip`,
        highlighted: true,
      }))
      .slice(0, 3) ?? [];

  // const destinations = [
  //   {
  //     id: 0,
  //     imageUrl: '/images/rome.png',
  //     title: 'Rome, Italy',
  //     amount: '$5.42k',
  //     duration: '10 Days Trip',
  //     highlighted: false,
  //   },
  //   {
  //     id: 1,
  //     imageUrl: '/images/london.jpg',
  //     title: 'London, UK',
  //     amount: '$4.2k',
  //     duration: '12 Days Trip',
  //     highlighted: false,
  //   },
  //   {
  //     id: 2,
  //     imageUrl: '/images/europe.png',
  //     title: 'Full Europe',
  //     amount: '$15k',
  //     duration: '28 Days Trip',
  //     highlighted: true,
  //   },
  // ];
  return (
    <section>
      <p className="text-lightGray text-[1.125rem] font-[600] text-center">
        Top Selling
      </p>
      <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
        Top Destinations
      </p>
      <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between mt-16 w-full">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            imageUrl={destination.imageUrl}
            title={destination.title}
            duration={destination.duration}
            amount={destination.amount}
            highlighted={destination.highlighted}
          />
        ))}
      </div>
    </section>
  );
}

export default TopSellingSection;
