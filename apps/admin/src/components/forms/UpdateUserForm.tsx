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
import { Input } from "@ui/components/shadcn/input";
import { updateUserSchema } from "@repo/validators/user";
import { User } from "@repo/types";
import Image from "next/image";

type UpdateUserType = z.infer<typeof updateUserSchema>;

const UpdateUserForm = ({ user }: { user: User }) => {
  const form = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const { control } = form;
  const { isSubmitting: isLoading } = form.formState;

  return (
    <div className="flex gap-10">
      <div>
        <Image
          src={user.image ?? "/icons/avatar-fallback.svg"}
          alt={user.name}
          width={150}
          height={150}
        />
      </div>
      <Form {...form}>
        <form
          // onSubmit={handleSubmit((value) => mutate(value))}
          className="flex-1 space-y-8"
        >
          <FormField
            control={control}
            name="name"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="pointer-events-none w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="pointer-events-none w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="role"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="pointer-events-none w-full">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="balance"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="pointer-events-none w-full">
                <FormLabel>Balance</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="pointer-events-none w-full">
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input value={user?.school?.name ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* <SubmitButton isSubmitting={isLoading} /> */}
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserForm;
