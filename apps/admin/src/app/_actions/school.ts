"use server";

import { getBackendApi } from "@/lib/axios";
import { checkSessionAction } from ".";

export async function getSchoolExportData({ id }: { id: string }) {
  const accessToken = (await checkSessionAction()).accessToken;

  try {
    const result = await getBackendApi(accessToken).get(
      `/schools/${id}/for-export`,
    );
    console.log(result.data)

    return { data: result.data, error: null };
  } catch (error) {
    console.error("schoolActions getSchoolExportData", error);
    return { data: null, error: "Failed to export school data" };
  }
}
