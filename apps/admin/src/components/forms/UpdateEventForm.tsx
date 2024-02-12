"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { XIcon } from "lucide-react";
import { Input } from "@ui/components/shadcn/input";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { updateEventSchema } from "@repo/validators/event";
import { Button } from "@ui/components/shadcn/button";
import FormFieldWrapper from "./FormFieldWrapper";
import { MultiFileDropzoneField } from "./MultiFileDropzoneField";
import React from "react";
import RichTextEditor from "../RichTextEditor";
import { EventJoined } from "@repo/types";
import { Checkbox } from "@ui/components/shadcn/checkbox";

type UpdateEventType = z.infer<typeof updateEventSchema>;

const UpdateEventForm = ({ event }: { event: EventJoined }) => {
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const utils = api.useUtils();

  const defaultValues: UpdateEventType = {
    ...event,
    // images: [],
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
          <FormFieldWrapper className="flex-nowrap">
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

            <FormField
              control={control}
              name="cost"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={0} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="duration"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event duration (days)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={0} />
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
            <React.Fragment key={field.id}>
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

          <FormField
            control={control}
            name="highlighted"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="flex w-fit flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Highlighted</FormLabel>
                  <FormDescription>
                    If checked, this event will be highlighted on the home page,
                    etc.
                  </FormDescription>
                </div>
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
