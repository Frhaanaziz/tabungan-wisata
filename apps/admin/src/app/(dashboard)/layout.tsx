import type { ReactNode } from "react";
import { checkSessionAction } from "../_actions";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await checkSessionAction();

  return <Sidebar session={session}>{children}</Sidebar>;
};

export default DashboardLayout;
