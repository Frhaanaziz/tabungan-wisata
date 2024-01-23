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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@ui/components/command";
import { Dialog, DialogContent, DialogTrigger } from "@ui/components/dialog";
import { buttonVariants } from "@ui/components/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@ui/components/calendar";

import { Input } from "@ui/components/input";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { addEventSchema } from "@repo/validators/event";
import { Button } from "@ui/components/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, getErrorMessage } from "@repo/utils";
import { School } from "@repo/types";
import { ScrollArea } from "@ui/components/scroll-area";
import FormFieldWrapper from "./FormFieldWrapper";
import RichTextEditor from "../RichTextEditor";
import { MultiFileDropzoneField } from "./MultiFileDropzoneField";
import React from "react";

type AddEventType = z.infer<typeof addEventSchema>;

const AddEventForm = ({ schools }: { schools: School[] }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const defaultValues: AddEventType = {
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    cost: 0,
    schoolId: "",
    include: "",
    images: [],
  };

  const utils = api.useUtils();
  const form = useForm<AddEventType>({
    resolver: zodResolver(addEventSchema),
    defaultValues,
  });
  const { handleSubmit, control, formState, reset } = form;

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
                  name="description"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
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

                <FormFieldWrapper>
                  <FormField
                    control={form.control}
                    name="schoolId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="mb-2">School</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-fit min-w-56 justify-between"
                            >
                              {field.value
                                ? schools.find(
                                    (school) => school.id === field.value,
                                  )?.name
                                : "Select school..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-fit min-w-56 p-0"
                            asChild
                          >
                            <Command>
                              <CommandInput placeholder="Search school..." />
                              <CommandEmpty>No school found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="h-60">
                                  {schools.map((school) => (
                                    <CommandItem
                                      key={school.id}
                                      value={`${school.name}!@#$$#@!${school.id}`}
                                      onSelect={(currentValue) => {
                                        const id = currentValue
                                          .split("!@#$$#@!")
                                          .at(1);

                                        if (id && id === field.value)
                                          field.onChange("");
                                        else if (id) field.onChange(id);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === school.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {school.name}
                                    </CommandItem>
                                  ))}
                                </ScrollArea>
                              </CommandGroup>
                            </Command>
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
