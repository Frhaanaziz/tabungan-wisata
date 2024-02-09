import { getEventsAction } from '@/app/_actions/event';
import { truncate } from '@repo/utils';
import { AspectRatio } from '@ui/components/shadcn/aspect-ratio';
import { MoveRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const EventListAside = async () => {
  const { data } = await getEventsAction({ highlighted: true });

  const events = data?.slice(0, 4) ?? [];

  return (
    <>
      {events.map(({ id, images, name }) => (
        <Link
          key={id}
          href={`/events/${id}`}
          scroll={false}
          className="group block"
        >
          <AspectRatio
            ratio={3 / 2}
            className="relative overflow-hidden rounded-lg"
          >
            <Image
              src={images.length ? images.at(0)?.url! : '/'}
              alt={name}
              priority
              fill
              sizes="(min-width: 1536px) 40vw, (min-width: 1280px) 45vw, (min-width: 1024px) 45vw, (min-width: 768px) 50vw, (min-width: 640px) 90vw, 100vw"
              className="w-full rounded-xl group-hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <div className="absolute z-20  space-y-1 text-white bottom-5 left-5">
              <p className="text-2xl font-semibold">{truncate(name, 40)}</p>
              <div className="flex items-center gap-2 relative">
                <MoveRightIcon className="w-5 h-5 absolute -left-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-300 ease-in-out" />
                <p className="group-hover:translate-x-7 transition-transform duration-300 ease-in-out">
                  Read more
                </p>
                <MoveRightIcon className="w-5 h-5  group-hover:opacity-0 group-hover:translate-x-6 transition-all duration-300 ease-in-out" />
              </div>
            </div>
            <div className="z-10 absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/0" />
          </AspectRatio>
        </Link>
      ))}
    </>
  );
};

export default EventListAside;
