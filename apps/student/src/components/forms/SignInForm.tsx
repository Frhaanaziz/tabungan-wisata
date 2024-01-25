"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button } from "@ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import Link from "next/link";
import { Checkbox } from "@ui/components/checkbox";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { signInSchema } from "@repo/validators/auth";
import { getErrorMessage } from "@repo/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/constant";
import Image from "next/image";
import googleIcon from "@repo/assets/icons/google.svg";
import { useEffect } from "react";

interface Props {
  callbackUrl: string | string[] | undefined;
  error: string | string[] | undefined;
}

const SignInForm = ({ callbackUrl, error }: Props) => {
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });

  const { handleSubmit, control, formState, reset } = form;
  const { isSubmitting } = formState;

  async function onSubmit({ email, password }: z.infer<typeof signInSchema>) {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: typeof callbackUrl === "string" ? callbackUrl : baseUrl,
      });
      if (!result) throw new Error("Something went wrong, please try again.");
      if (result.error) throw new Error(result.error);

      reset(defaultValues);
      toast.success("Signed in successfully!");
      router.replace(result.url ?? baseUrl);
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("SignInForm", error);
    }
  }

  async function handleGoogleSignIn() {
    try {
      await signIn("google", {
        callbackUrl: typeof callbackUrl === "string" ? callbackUrl : baseUrl,
        redirect: false,
      });
    } catch (error) {
      toast.error("Something went wrong, try sign in with email instead.");
    }
  }

  useEffect(() => {
    if (typeof error === "string") {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" disabled={isSubmitting} />
              <label
                htmlFor="remember-me"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <Link
              href="/auth/reset-password"
              className="text-sm font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </Form>

      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2" />
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-background px-5">Or continue with</span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          className={"w-full gap-3"}
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          <Image
            src={googleIcon}
            priority
            width={20}
            height={20}
            alt="google"
            className="h-5 w-5 invert dark:invert-0"
          />
          <span className="text-sm font-semibold leading-6">Google</span>
        </Button>
      </div>

      <Link
        href="/auth/signup"
        className="mt-3 inline-block text-center text-sm text-primary underline"
      >
        Don&apos;t have an account? Sign up
      </Link>
    </>
  );
};

export default SignInForm;
