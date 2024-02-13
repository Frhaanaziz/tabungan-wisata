import { type ReactNode } from "react";
import Footer from "@/components/Footer";
import { api } from "@/trpc/server";
import Sidebar from "@/components/Sidebar";
import { checkSessionAction } from "../_actions";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await checkSessionAction();

  const [eventRegistrations, highlightedEvents] = await Promise.all([
    api.school.getEventRegistrations.query(),
    api.event.getHighlighted.query(),
  ]);

  const events = eventRegistrations.map((registration) => registration.event);

  return (
    <>
      <Sidebar
        events={events}
        highlightedEvents={highlightedEvents}
        session={session}
      />
      <main className="py-10 lg:pl-72">{children}</main>
      <Footer className="lg:pl-72" />
    </>
  );
};

export default DashboardLayout;
