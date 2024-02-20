"use server";

import { getBackendApi } from "@/lib/axios";
import { checkSessionAction } from ".";

export async function getUserPayments({ id }: { id: string }) {
  const accessToken = (await checkSessionAction()).accessToken;

  try {
    const result = await getBackendApi(accessToken).get(
      `/users/${id}/payments`,
    );

    return { data: result.data, error: null };
  } catch (error) {
    console.error("userRouter getPayments", error);
    return { data: null, error: "Failed to get payments" };
  }
}
