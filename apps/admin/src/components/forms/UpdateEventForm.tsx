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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/popover";
import { Input } from "@ui/components/input";
import { Textarea } from "@ui/components/textarea";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { updateEventSchema } from "@repo/validators/event";
import { Button } from "@ui/components/button";
import { CalendarIcon } from "lucide-react";
import FormFieldWrapper from "./FormFieldWrapper";
import { format } from "date-fns";
import { cn } from "@repo/utils";
import { Calendar } from "@ui/components/calendar";

type UpdateEventType = z.infer<typeof updateEventSchema>;

const UpdateEventForm = ({ event }: { event: UpdateEventType }) => {
  const utils = api.useUtils();

  const defaultValues: UpdateEventType = {
    ...event,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
  };

  const form = useForm<UpdateEventType>({
    resolver: zodResolver(updateEventSchema),
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const { mutate, isLoading } = api.event.update.useMutation({
    onSuccess: async () => {
      toast.success("Event updated successfully");
      await utils.event.invalidate();
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
        <FormField
          control={control}
          name="name"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter event name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter event description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cost"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={0}
                  placeholder="Enter event name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        </FormFieldWrapper>

        <SubmitButton isSubmitting={isLoading} />
      </form>
    </Form>
  );
};

export default UpdateEventForm;
