import { type ReactNode } from "react";
import { checkSessionAction } from "../_actions";
import Footer from "@/components/Footer";
import { api } from "@/trpc/server";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await checkSessionAction();
  const schoolId = session.data.schoolId as string;

  const eventRegistrations = await api.eventRegistration.getBySchoolId.query({
    schoolId,
  });

  return (
    <>
      <Sidebar />
      <main className="py-10 lg:pl-72">{children}</main>
      <Footer />
    </>
  );
};

export default DashboardLayout;
