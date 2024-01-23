import type { ReactNode } from "react";
import { checkSessionAction } from "../_actions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await checkSessionAction();
  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
