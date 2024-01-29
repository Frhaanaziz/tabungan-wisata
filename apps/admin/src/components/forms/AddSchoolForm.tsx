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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ui/components/shadcn/dialog";
import { buttonVariants } from "@ui/components/shadcn/button";
import { Input } from "@ui/components/shadcn/input";
import { addSchoolSchema } from "@repo/validators/school";
import { Textarea } from "@ui/components/shadcn/textarea";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import React from "react";

type AddSchoolType = z.infer<typeof addSchoolSchema>;

const AddSchoolForm = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

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
      setDialogOpen(false);
      toast.success("School added successfully");
      reset(defaultValues);
      await utils.school.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className={buttonVariants()}>+ Add</DialogTrigger>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};

export default AddSchoolForm;
