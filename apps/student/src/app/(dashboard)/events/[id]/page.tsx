import { getBackendApi } from "@/lib/axios";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@ui/components/shadcn/carousel";
import { AspectRatio } from "@ui/components/shadcn/aspect-ratio";
import Image from "next/image";
import RichText from "@ui/components/RichText";
import { notFound } from "next/navigation";
import { Event } from "@repo/types";

export async function generateStaticParams() {
  const result = await getBackendApi().get("/events/ids");

  return result.data;
}

const EventPage = async ({ params: { id } }: { params: { id: string } }) => {
  const event = (await getBackendApi().get(`/events/${id}`)).data as Event;
  if (!event) notFound();

  const images = event.images;

  return (
    <main className="container my-10 max-w-[1200px]">
      <section className="mb-16 grid items-center gap-16 sm:grid-cols-2">
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

          <CarouselPrevious className="translate-x-16" />
          <CarouselNext className="-translate-x-16" />
        </Carousel>

        <div>
          <p className="text-3xl font-bold">Included:</p>
          <div className="my-4 h-0.5 w-24 bg-primary" />
          <RichText
            content={event.include}
            className="prose-li:list-image-[url(/icons/check-circle.svg)]"
          />
        </div>
      </section>

      <h1 className="text-3xl font-bold">{event.name}</h1>
      <div className="my-4 h-0.5 w-24 bg-primary" />
      <RichText
        className={`prose-li:list-image-[url(/icons/check-circle.svg)]`}
        content={event.description}
      />
    </main>
  );
};

export default EventPage;
