"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/shadcn/form";
import { getErrorMessage } from "@repo/utils";
import { toast } from "sonner";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { createUserPasswordSchema } from "@repo/validators/user";
import { PasswordInput } from "@ui/components/PasswordInput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type CreateUserPasswordSchema = z.infer<typeof createUserPasswordSchema>;

const CreatePasswordForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const defaultValues: CreateUserPasswordSchema = {
    confirmNewPassword: "",
    newPassword: "",
  };

  const form = useForm<CreateUserPasswordSchema>({
    resolver: zodResolver(createUserPasswordSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = form;

  const { mutate, isLoading } = api.user.createPassword.useMutation({
    onSuccess: async (updatedUser) => {
      toast.success("Password created successfully");
      reset(defaultValues);

      await update({
        ...session,
        data: {
          ...session?.data,
          ...updatedUser,
        },
      });
      router.refresh();
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit((v) => mutate(v))} className="space-y-8">
        <FormField
          control={control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  disabled={isLoading}
                  placeholder="New Password"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  disabled={isLoading}
                  placeholder="Confirm Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isSubmitting={isLoading} />
      </form>
    </Form>
  );
};

export default CreatePasswordForm;
