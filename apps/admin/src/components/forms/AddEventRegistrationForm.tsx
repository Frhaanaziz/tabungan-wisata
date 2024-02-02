"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/shadcn/form";
import { Input } from "@ui/components/shadcn/input";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import React from "react";
import { addEventRegistrationSchema } from "@repo/validators/eventRegistration";
import EventFormField from "./EventFormField";

type AddEventRegistrationType = z.infer<typeof addEventRegistrationSchema>;

interface Props {
  schoolId: string;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEventRegistrationForm = ({ schoolId, setDialogOpen }: Props) => {
  const defaultValues: AddEventRegistrationType = {
    cost: 0,
    eventId: "",
    schoolId,
  };

  const utils = api.useUtils();
  const form = useForm<AddEventRegistrationType>({
    resolver: zodResolver(addEventRegistrationSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = form;

  const { data: events } = api.event.getAll.useQuery();

  const { mutate, isLoading } = api.eventRegistration.create.useMutation({
    onSuccess: async () => {
      setDialogOpen(false);
      toast.success("Event registration successfully!");
      reset(defaultValues);
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
            name="cost"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event cost</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min={0} />
                </FormControl>
                <FormDescription>
                  Set the event cost per student on Rp
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <EventFormField events={events} control={control} name="eventId" />
        </div>

        <SubmitButton isSubmitting={isLoading} />
      </form>
    </Form>
  );
};

export default AddEventRegistrationForm;
