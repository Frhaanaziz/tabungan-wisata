import type { ReactNode } from "react";
import { checkSessionAction } from "../_actions";
import Header from "@/components/Header";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await checkSessionAction();

  return (
    <>
      <Header session={session} />
      {children}
    </>
  );
};

export default DashboardLayout;
