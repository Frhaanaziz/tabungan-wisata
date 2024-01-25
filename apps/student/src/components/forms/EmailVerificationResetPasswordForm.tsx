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
import { Input } from "@ui/components/shadcn/input";
import { Loader2 } from "lucide-react";
import { getErrorMessage } from "@repo/utils";
import { toast } from "sonner";
import { emailSchema } from "@repo/validators/auth";
import { validateEmailOnResetPasswordAction } from "@/app/_actions/auth";
import { useRouter } from "next/navigation";

const EmailVerificationResetPasswordForm = () => {
  const router = useRouter();

  const defaultValues = {
    email: "",
  };

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues,
  });

  const { handleSubmit, control, formState, reset } = form;
  const { isSubmitting } = formState;

  async function onSubmit(formValues: z.infer<typeof emailSchema>) {
    try {
      const result = await validateEmailOnResetPasswordAction(formValues);
      if (result.error) throw new Error(result.error);

      reset(defaultValues);
      toast.success("Email sent!");
      router.push("/auth/signin");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <>
      <h1 className="mb-2 text-center text-xl font-semibold">
        Reset your password
      </h1>
      <p className="mb-8 text-muted-foreground">
        We will send you an email to reset your password
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Email me
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EmailVerificationResetPasswordForm;
