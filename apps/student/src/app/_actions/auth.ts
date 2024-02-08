"use server";
import {
  emailSchema,
  resetPasswordSchema,
  signInSchema,
  signInGoogleSchema,
} from "@repo/validators/auth";
import { getNestErrorMessage, getZodErrorMessage } from "@repo/utils";
import type { z } from "zod";
import { getBackendApi } from "@/lib/axios";
import { baseUrl } from "@/lib/constant";

export async function signInAction(rawData: z.infer<typeof signInSchema>) {
  const zodResult = signInSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
      data: null,
    };
  const { data } = zodResult;

  try {
    const result = await getBackendApi().post("/auth/signin", data);

    return { data: result.data, error: null };
  } catch (error) {
    console.error("signInAction", error);
    return { error: getNestErrorMessage(error), data: null };
  }
}

export async function validateEmailOnResetPasswordAction(
  rawData: z.infer<typeof emailSchema>,
) {
  const zodResult = emailSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
    };
  const { email } = zodResult.data;

  try {
    await getBackendApi().post("/verifications/verify-email-reset-password", {
      email,
      baseUrl,
    });

    return { error: null };
  } catch (error) {
    console.error("validateEmailOnResetPasswordAction", error);
    return { error: getNestErrorMessage(error) };
  }
}

export async function resetPasswordAction(
  rawData: z.infer<typeof resetPasswordSchema>,
) {
  const zodResult = resetPasswordSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
      data: null,
    };
  const { newPassword, token } = zodResult.data;

  try {
    await getBackendApi(undefined, { token }).post(`/users/reset-password`, {
      newPassword,
    });

    return { error: null };
  } catch (error) {
    console.error("resetPasswordAction", error);
    return { error: getNestErrorMessage(error) };
  }
}

export async function signInGoogleAction(rawData: unknown) {
  const zodResult = signInGoogleSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
      data: null,
    };
  const { data } = zodResult;

  try {
    const result = await getBackendApi().post("/auth/signin-google", data);

    return { data: result.data, error: null };
  } catch (error) {
    console.error("signInGoogleAction", error);
    return { error: getNestErrorMessage(error), data: null };
  }
}

export async function refreshJwtTokenAction({ token }: { token: string }) {
  try {
    const { data } = await getBackendApi(token).post(
      "/verifications/refresh-token",
      { token },
    );

    return { data: data.token, error: null };
  } catch (error) {
    console.error("refreshJwtTokenAction", error);
    return { error: getNestErrorMessage(error), data: null };
  }
}
