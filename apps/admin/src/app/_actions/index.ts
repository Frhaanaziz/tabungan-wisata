"use server";

import { getBackendApi } from "@/lib/axios";
import { getServerAuthSession } from "@/server/auth";
import { notFound } from "next/navigation";

export async function checkSessionAction() {
  const session = await getServerAuthSession();
  if (!session) notFound();

  return session;
}

export async function checkAccessToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;

  try {
    const { data } = await getBackendApi().post("verifications/verify-token", {
      token,
    });
    if (!data || !data.user || !data.user.id) return false;

    return true;
  } catch (error) {
    console.error("checkAccessToken", error);
    return false;
  }
}
