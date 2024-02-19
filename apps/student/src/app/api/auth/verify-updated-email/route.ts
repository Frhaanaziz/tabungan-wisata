import { getNestErrorMessage } from "@repo/utils";
import { NextResponse } from "next/server";
import { getBackendApi } from "@/lib/axios";
import { baseUrl } from "@/lib/constant";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  if (typeof token !== "string" || typeof userId !== "string")
    return NextResponse.json(
      { error: "Token, or ID not found" },
      { status: 500 },
    );

  try {
    const data = { token };
    await getBackendApi(token).patch(`/users/${userId}/email`, data);

    return NextResponse.redirect(`${baseUrl}/auth/signin`);
  } catch (error) {
    console.error("verify-updated-email", error);
    return NextResponse.json(
      { error: getNestErrorMessage(error) },
      { status: 500 },
    );
  }
}
