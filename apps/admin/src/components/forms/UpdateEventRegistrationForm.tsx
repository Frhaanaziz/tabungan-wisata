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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/shadcn/popover";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn, getErrorMessage } from "@repo/utils";
import { Calendar } from "@ui/components/shadcn/calendar";
import { Input } from "@ui/components/shadcn/input";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import React from "react";
import { updateEventRegistrationSchema } from "@repo/validators/eventRegistration";
import EventFormField from "./EventFormField";
import FormFieldWrapper from "./FormFieldWrapper";
import { Button } from "@ui/components/shadcn/button";

type UpdateEventRegistrationType = z.infer<
  typeof updateEventRegistrationSchema
>;

type Props = {
  eventRegistration: UpdateEventRegistrationType;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateEventRegistrationForm = ({
  eventRegistration,
  setDialogOpen,
}: Props) => {
  const defaultValues: UpdateEventRegistrationType = {
    ...eventRegistration,
  };

  const utils = api.useUtils();
  const form = useForm<UpdateEventRegistrationType>({
    resolver: zodResolver(updateEventRegistrationSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = form;

  const { data: events } = api.event.getAll.useQuery();

  const { mutate, isLoading } = api.eventRegistration.update.useMutation({
    onSuccess: async () => {
      setDialogOpen(false);
      toast.success("Event registration updated!");
      reset(defaultValues);
      await utils.eventRegistration.invalidate();
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((value) => mutate(value))}
        className="space-y-8"
      >
        <FormFieldWrapper>
          <EventFormField events={events} control={control} name="eventId" />
        </FormFieldWrapper>

        <FormFieldWrapper>
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      defaultMonth={field.value}
                      // disabled={(date) =>
                      //   date > new Date() || date < new Date("1900-01-01")
                      // }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event end date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      defaultMonth={field.value}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentLimit"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment limit</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cost"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="w-full">
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
        </FormFieldWrapper>

        <SubmitButton isSubmitting={isLoading} />
      </form>
    </Form>
  );
};

export default UpdateEventRegistrationForm;
