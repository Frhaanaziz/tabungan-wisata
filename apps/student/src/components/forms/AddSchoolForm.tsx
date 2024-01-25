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
import { getErrorMessage } from "@repo/utils";
import { toast } from "sonner";
import { AddSchoolCodeSchema } from "@repo/validators/auth";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@ui/components/shadcn/button";

const AddSchoolForm = () => {
  const router = useRouter();
  const { update, data: session } = useSession();

  const defaultValues = {
    schoolCode: "",
  };

  const form = useForm<z.infer<typeof AddSchoolCodeSchema>>({
    resolver: zodResolver(AddSchoolCodeSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = form;

  const { mutate, isLoading } = api.user.updateSchool.useMutation({
    onSuccess: async ({ schoolId }) => {
      await update({
        ...session,
        data: {
          ...session?.data,
          schoolId,
        },
      });

      toast.success("Success!");
      reset(defaultValues);
      router.replace("/");
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });

  return (
    <>
      <h1 className="mb-2 text-center text-xl font-semibold">
        Add your school code
      </h1>
      <p className="mb-8 text-muted-foreground">
        Please enter the code provided by your school
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit((v) => mutate(v))} className="space-y-8">
          <FormField
            control={control}
            name="schoolCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <SubmitButton isSubmitting={isLoading} />
            <Button
              type="button"
              variant={"outline"}
              disabled={isLoading}
              onClick={async () => {
                await signOut({
                  callbackUrl: "/auth/signin",
                });
              }}
            >
              Sign Out
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddSchoolForm;
