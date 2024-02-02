"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/shadcn/popover";
import { Input } from "@ui/components/shadcn/input";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { updateEventSchema } from "@repo/validators/event";
import { Button } from "@ui/components/shadcn/button";
import { CalendarIcon, XIcon } from "lucide-react";
import FormFieldWrapper from "./FormFieldWrapper";
import { format } from "date-fns";
import { cn } from "@repo/utils";
import { Calendar } from "@ui/components/shadcn/calendar";
import { MultiFileDropzoneField } from "./MultiFileDropzoneField";
import React from "react";
import RichTextEditor from "../RichTextEditor";
import { Event } from "@repo/types";

type UpdateEventType = z.infer<typeof updateEventSchema>;

const UpdateEventForm = ({ event }: { event: Event }) => {
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const utils = api.useUtils();

  const defaultValues: UpdateEventType = {
    ...event,
    images: [],
  };

  const form = useForm<UpdateEventType>({
    resolver: zodResolver(updateEventSchema),
    defaultValues,
  });

  const { handleSubmit, control, formState } = form;

  const { fields, append, remove } = useFieldArray({
    name: "itineraries",
    control,
  });

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
        className="space-y-8 p-1"
      >
        <div className="space-y-5">
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

          <FormFieldWrapper className="flex-nowrap">
            <FormField
              control={control}
              name="cost"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="w-full">
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

            <FormField
              control={control}
              name="name"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter event name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormFieldWrapper>

          <FormField
            control={control}
            name="include"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Include</FormLabel>
                <FormControl>
                  <RichTextEditor
                    {...field}
                    {...formState}
                    isLoading={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="exclude"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exclude</FormLabel>
                <FormControl>
                  <RichTextEditor
                    {...field}
                    {...formState}
                    isLoading={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="highlight"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highlight</FormLabel>
                <FormControl>
                  <RichTextEditor
                    {...field}
                    {...formState}
                    isLoading={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((field, index) => (
            <React.Fragment key={index}>
              <FormField
                control={form.control}
                key={field.id}
                name={`itineraries.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Itinerary #day{index + 1} location{" "}
                      {!!index && (
                        <Button
                          type="button"
                          size={"icon"}
                          className="h-4 w-4"
                          onClick={() => remove(index)}
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                key={field.id}
                name={`itineraries.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Itinerary #day{index + 1} description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        {...field}
                        {...formState}
                        isLoading={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </React.Fragment>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ name: "", description: "", eventId: "" })}
          >
            Add Itinerary
          </Button>

          <FormField
            control={control}
            name="images"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <MultiFileDropzoneField
                    {...field}
                    {...formState}
                    category="event"
                    isSubmitting={isLoading}
                    isUploading={(isUploading) =>
                      setIsUploadingImage(isUploading)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SubmitButton isSubmitting={isLoading || isUploadingImage} />
      </form>
    </Form>
  );
};

export default UpdateEventForm;
