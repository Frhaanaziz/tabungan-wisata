import { type ReactNode } from "react";
import { checkSessionAction } from "../_actions";
import Footer from "@/components/Footer";
import { api } from "@/trpc/server";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await checkSessionAction();
  const schoolId = session.data.schoolId as string;

  const [eventRegistrations, highlightedEvents] = await Promise.all([
    api.eventRegistration.getBySchoolId.query({ schoolId }),
    api.event.getHighlighted.query(),
  ]);

  const events = eventRegistrations.map((event) => event.event);

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
