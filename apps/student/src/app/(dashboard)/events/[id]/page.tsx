import EventCarousel from "@/components/EventCarousel";
import { api } from "@/trpc/server";
import RichText from "@ui/components/RichText";

// export function generateStaticParams() {
//   return api.event.getMany.query().then((events) => {
//     return events.map((event) => ({
//       params: { id: event.id },
//     }));
//   });
// }

const EventPage = async ({ params: { id } }: { params: { id: string } }) => {
  const event = await api.event.getOne.query(id);
  return (
    <main className="container my-10 max-w-[1200px]">
      <section className="mb-16 grid items-center gap-16 sm:grid-cols-2">
        <EventCarousel event={event} />

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
