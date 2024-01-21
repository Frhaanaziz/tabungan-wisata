"use server";

import { getServerAuthSession } from "@/server/auth";
import { notFound } from "next/navigation";

export async function checkSessionAction() {
  const session = await getServerAuthSession();
  if (!session) notFound();

  return session;
}
