"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@ui/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/shadcn/form";
import { Input } from "@ui/components/shadcn/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { signUpSchema } from "@repo/validators/auth";
import { getErrorMessage } from "@repo/utils";
import { toast } from "sonner";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import googleIcon from "@repo/assets/icons/google.svg";
import { api } from "@/trpc/react";
import { baseUrl } from "@/lib/constant";
import { PasswordInput } from "@ui/components/PasswordInput";

type SignUpType = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const defaultValues: SignUpType = {
    name: "",
    email: "",
    password: "",
    schoolCode: "",
  };

  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = form;

  const { mutate, isLoading: isSubmitting } = api.auth.signUp.useMutation({
    onSuccess: () => {
      toast.success("Please check your email to verify your account");
      reset(defaultValues);
      router.push("/auth/signin");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  async function handleGoogleSignUp() {
    try {
      await signIn("google", {
        callbackUrl: baseUrl,
        redirect: false,
      });
    } catch (error) {
      toast.error("Something went wrong, try sign up with email instead.");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit((v) => mutate(v))} className="space-y-6">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Email@example.com"
                    autoComplete="email"
                  />
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
                  <PasswordInput
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Enter your password"
                    autoComplete="password"
                  />
                </FormControl>
                {/* <FormMessage /> */}
                <ul className="list-inside list-disc text-sm">
                  <li>Minimum 6 characters long</li>
                </ul>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="schoolCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="School access code"
                    disabled={isSubmitting}
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Sign Up
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
          onClick={handleGoogleSignUp}
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
        href="/auth/signin"
        className="mt-3 inline-block text-center text-sm text-primary underline"
      >
        Have an account? Sign in
      </Link>
    </>
  );
};

export default SignUpForm;
