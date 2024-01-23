"use client";
import { Event } from "@repo/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@ui/components/carousel";
import { AspectRatio } from "@ui/components/aspect-ratio";
import Image from "next/image";
import { useEffect, useState } from "react";

const EventCarousel = ({ event }: { event: Omit<Event, "school"> }) => {
  const images = event.images;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {images.map((image, i) => (
          <CarouselItem key={image.id}>
            <AspectRatio ratio={1} className="w-full">
              <Image
                src={image.url}
                className="aspect-square w-full rounded-xl"
                priority
                fill
                sizes="(min-width: 1536px) 40vw, (min-width: 1280px) 45vw, (min-width: 1024px) 45vw, (min-width: 768px) 50vw, (min-width: 640px) 90vw, 100vw"
                alt={`${event.name} - ${i}`}
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      {isClient && (
        <>
          <CarouselPrevious className="translate-x-16" />
          <CarouselNext className="-translate-x-16" />
        </>
      )}
    </Carousel>
  );
};

export default EventCarousel;
