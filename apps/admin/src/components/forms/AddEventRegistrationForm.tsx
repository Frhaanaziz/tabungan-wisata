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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ui/components/shadcn/dialog";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn, getErrorMessage } from "@repo/utils";
import { Calendar } from "@ui/components/shadcn/calendar";
import { Input } from "@ui/components/shadcn/input";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import React from "react";
import { addEventRegistrationSchema } from "@repo/validators/eventRegistration";
import EventFormField from "./EventFormField";
import FormFieldWrapper from "./FormFieldWrapper";
import { Button, buttonVariants } from "@ui/components/shadcn/button";
import SchoolFormField from "./SchoolFormField";

type AddEventRegistrationType = z.infer<typeof addEventRegistrationSchema>;

const AddEventRegistrationForm = () => {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  // paymentLimit default value is 45 days before the event start date
  const defaultValues: AddEventRegistrationType = {
    cost: 0,
    eventId: "",
    schoolId: "",
    paymentLimit: new Date(),
    startDate: new Date(),
    endDate: new Date(),
  };

  const utils = api.useUtils();
  const form = useForm<AddEventRegistrationType>({
    resolver: zodResolver(addEventRegistrationSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = form;

  const { data: events } = api.event.getAll.useQuery();
  const { data: schools } = api.school.getAll.useQuery();

  const { mutate, isLoading } = api.eventRegistration.create.useMutation({
    onSuccess: async () => {
      setDialogOpen(false);
      toast.success("Event registration successfully!");
      reset(defaultValues);
      await utils.eventRegistration.invalidate();
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className={buttonVariants()}>+ Add</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <Form {...form}>
          <form
            onSubmit={handleSubmit((value) => mutate(value))}
            className="space-y-8"
          >
            <FormFieldWrapper>
              <EventFormField
                events={events}
                control={control}
                name="eventId"
              />
              <SchoolFormField
                control={control}
                schools={schools}
                name="schoolId"
              />
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
      </DialogContent>
    </Dialog>
  );
};

export default AddEventRegistrationForm;
