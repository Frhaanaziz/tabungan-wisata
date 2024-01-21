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
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { updateSchoolSchema } from "@repo/validators/school";
import { Textarea } from "@ui/components/textarea";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";

type UpdateSchoolType = z.infer<typeof updateSchoolSchema>;

const UpdateSchoolForm = ({ school }: { school: UpdateSchoolType }) => {
  const utils = api.useUtils();
  const form = useForm<UpdateSchoolType>({
    resolver: zodResolver(updateSchoolSchema),
    defaultValues: school,
  });

  const { handleSubmit, control } = form;

  const { mutate, isLoading } = api.school.update.useMutation({
    onSuccess: async () => {
      toast.success("School updated successfully");
      await utils.school.getAllPaginated.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((value) => mutate(value))}
        className="space-y-8"
      >
        <div className="space-y-5">
          <FormField
            control={control}
            name="name"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter school name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="address"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter school address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="contact"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter school contact" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SubmitButton isSubmitting={isLoading} />
      </form>
    </Form>
  );
};

export default UpdateSchoolForm;
