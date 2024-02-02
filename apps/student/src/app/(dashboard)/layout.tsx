import type { ReactNode } from "react";
import { checkSessionAction } from "../_actions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api } from "@/trpc/server";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await checkSessionAction();
  const schoolId = session.data.schoolId as string;

  const eventRegistrations = await api.eventRegistration.getBySchoolId.query({
    schoolId,
  });

  return (
    <>
      <Header
        session={session}
        eventRegistrations={eventRegistrations as any}
      />
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
