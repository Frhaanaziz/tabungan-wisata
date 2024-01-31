"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button } from "@ui/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/shadcn/form";
import { Loader2 } from "lucide-react";
import { getErrorMessage } from "@repo/utils";
import { toast } from "sonner";
import { resetPasswordSchema } from "@repo/validators/auth";
import { resetPasswordAction } from "@/app/_actions/auth";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@ui/components/PasswordInput";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();

  const defaultValues = {
    token,
    newPassword: "",
    confirmPassword: "",
  };

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
  });

  const { handleSubmit, control, formState, reset } = form;
  const { isSubmitting } = formState;

  async function onSubmit(formValues: z.infer<typeof resetPasswordSchema>) {
    try {
      const result = await resetPasswordAction(formValues);
      if (result.error) throw new Error(result.error);

      reset(defaultValues);
      toast.success("Password changed successfully, please sign in.");
      router.push("/auth/signin");
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("ResetPasswordForm", error);
    }
  }

  return (
    <>
      <h1 className="mb-2 text-center text-xl font-semibold">
        Change your password
      </h1>
      <p className="mx-auto mb-8 max-w-[300px] text-center text-muted-foreground">
        Enter a new password below to change your password
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-5">
            <FormField
              control={control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter New Password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Retype New Password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Change password
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
