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
import { addSchoolSchema } from "@repo/validators/school";
import { Textarea } from "@ui/components/textarea";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";

type AddSchoolType = z.infer<typeof addSchoolSchema>;

const AddSchoolForm = () => {
  const defaultValues: AddSchoolType = {
    name: "",
    address: "",
    contact: "",
  };

  const utils = api.useUtils();
  const form = useForm<AddSchoolType>({
    resolver: zodResolver(addSchoolSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = form;

  const { mutate, isLoading } = api.school.create.useMutation({
    onSuccess: async () => {
      reset(defaultValues);
      toast.success("School added successfully");
      await utils.school.invalidate();
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

export default AddSchoolForm;
