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
import { updateUserPasswordSchema } from "@repo/validators/user";
import { PasswordInput } from "@ui/components/PasswordInput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type UpdateUserPasswordType = z.infer<typeof updateUserPasswordSchema>;

const UpdatePasswordForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const defaultValues: UpdateUserPasswordType = {
    confirmNewPassword: "",
    currentPassword: "",
    newPassword: "",
  };

  const form = useForm<UpdateUserPasswordType>({
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = form;

  const { mutate, isLoading } = api.user.updatePassword.useMutation({
    onSuccess: async (updatedUser) => {
      toast.success("Password updated successfully");
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
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  disabled={isLoading}
                  placeholder="Current Password"
                  autoComplete="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

export default UpdatePasswordForm;
