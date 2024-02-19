import { getNestErrorMessage } from "@repo/utils";
import { NextResponse } from "next/server";
import { getBackendApi } from "@/lib/axios";
import { baseUrl } from "@/lib/constant";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") as string;
  const userId = searchParams.get("id") as string;
  if (typeof token !== "string" || typeof userId !== "string")
    return NextResponse.json(
      { error: "Token or ID not found" },
      { status: 500 },
    );

  try {
    const data = { emailVerified: true, token };
    await getBackendApi(token).patch(`/users/${userId}/emailVerified`, data);

    return NextResponse.redirect(baseUrl);
  } catch (error) {
    return NextResponse.json(
      { error: getNestErrorMessage(error) },
      { status: 500 },
    );
  }
}
