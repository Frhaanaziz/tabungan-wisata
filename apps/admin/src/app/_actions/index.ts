"use server";

import { getServerAuthSession } from "@/server/auth";
import { notFound, redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function checkSessionAction() {
  const session = await getServerAuthSession();
  if (!session) notFound();

  return session;
}

export function checkAccessToken(token: string | undefined): boolean {
  if (!token) redirect("/auth/signin");

  try {
    jwt.verify(token, process.env.NEXTAUTH_SECRET!);

    return true;
  } catch (error) {
    redirect("/auth/signin");
  }
}
