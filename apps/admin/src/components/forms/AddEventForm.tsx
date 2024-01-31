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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ui/components/shadcn/dialog";
import { buttonVariants } from "@ui/components/shadcn/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon, XIcon } from "lucide-react";
import { Calendar } from "@ui/components/shadcn/calendar";

import { Input } from "@ui/components/shadcn/input";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { addEventSchema } from "@repo/validators/event";
import { Button } from "@ui/components/shadcn/button";
import { cn, getErrorMessage } from "@repo/utils";
import { School } from "@repo/types";
import { ScrollArea } from "@ui/components/shadcn/scroll-area";
import FormFieldWrapper from "./FormFieldWrapper";
import RichTextEditor from "../RichTextEditor";
import { MultiFileDropzoneField } from "./MultiFileDropzoneField";
import React from "react";
import SchoolFormField from "./SchoolFormField";

type AddEventType = z.infer<typeof addEventSchema>;

const AddEventForm = ({ schools }: { schools: School[] }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const defaultValues: AddEventType = {
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    cost: 0,
    schoolId: "",
    highlight: "",
    include: "",
    exclude: "",
    itineraries: [{ description: "", name: "", eventId: "" }],
    images: [],
  };

  const utils = api.useUtils();
  const form = useForm<AddEventType>({
    resolver: zodResolver(addEventSchema),
    defaultValues,
  });
  const { handleSubmit, control, formState, reset } = form;

  const { fields, append, remove } = useFieldArray({
    name: "itineraries",
    control: form.control,
  });

  const { mutate, isLoading } = api.event.create.useMutation({
    onSuccess: async () => {
      reset();
      toast.success("Event added successfully");
      await utils.event.invalidate();
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
    onSettled: () => {
      setIsModalOpen(false);
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className={buttonVariants()}>+ Add</DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <ScrollArea className="max-h-screen p-5">
          <Form {...form}>
            <form
              onSubmit={handleSubmit((value) => mutate(value))}
              className="space-y-8 p-1"
            >
              <div className="space-y-5">
                <FormFieldWrapper>
                  <SchoolFormField
                    schools={schools}
                    control={control}
                    name={"schoolId"}
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
                          <FormLabel>
                            Itinerary #day{index + 1} description
                          </FormLabel>
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
                  onClick={() =>
                    append({ name: "", description: "", eventId: "" })
                  }
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventForm;
