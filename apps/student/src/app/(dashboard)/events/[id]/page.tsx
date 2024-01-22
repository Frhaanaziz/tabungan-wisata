import EventCarousel from "@/components/EventCarousel";
import { api } from "@/trpc/server";
import RichText from "@ui/components/RichText";

const EventPage = async ({ params: { id } }: { params: { id: string } }) => {
  const event = await api.event.getOne.query(id);
  return (
    <main className="container max-w-[1200px]">
      <section className="my-10 grid items-center gap-10 sm:grid-cols-2">
        <EventCarousel event={event} />

        <div>
          <p className="text-3xl font-bold">Included:</p>
          <div className="my-4 h-0.5 w-24 bg-primary" />
          <ul className="clear-start flex list-inside list-image-[url(/icons/check-circle.svg)] flex-col gap-2">
            <li>2-malam di hotel pilihan termasuk makan pagi sekamar berdua</li>
            <li>Private Deluxe AC Car, Indonesia speaking Guide</li>
            <li>Tiket masuk, parkir, 02 x Lunch di Local Restaurant</li>
            <li>Transfer Airport – Hotel – Airport</li>
            <li>Disediakan Hand Sanitizer dalam mobil</li>
            <li>Airline Tickets</li>
            <li>Airport tax & Additional baggage</li>
            <li>Rapid Test / PCR Test</li>
          </ul>
        </div>
      </section>

      <RichText
        className={`prose-li:list-image-[url(/icons/check-circle.svg)]`}
        content={event.description}
      />
    </main>
  );
};

export default EventPage;
