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
import { Input } from "@ui/components/shadcn/input";
import { addSchoolSchema } from "@repo/validators/school";
import { Textarea } from "@ui/components/shadcn/textarea";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import React from "react";
import { Button } from "@ui/components/shadcn/button";
import { XIcon } from "lucide-react";
import FormFieldWrapper from "./FormFieldWrapper";

type AddSchoolType = z.infer<typeof addSchoolSchema>;

const AddSchoolForm = () => {
  const defaultValues: AddSchoolType = {
    name: "",
    address: "",
    contact: "",
    schoolAdmins: [{ name: "", contact: "" }],
  };

  const utils = api.useUtils();
  const form = useForm<AddSchoolType>({
    resolver: zodResolver(addSchoolSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = form;

  const {
    fields,
    append: addPIC,
    remove: removePIC,
  } = useFieldArray({
    name: "schoolAdmins",
    control,
  });

  const { mutate, isLoading } = api.school.create.useMutation({
    onSuccess: async () => {
      toast.success("School added successfully");
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

          {fields.map((field, i) => (
            <FormFieldWrapper key={field.id}>
              <FormField
                control={form.control}
                key={field.id}
                name={`schoolAdmins.${i}.name`}
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="space-x-2">
                      <span>School PIC #{i + 1} name</span>
                      {!!i && (
                        <Button
                          type="button"
                          size={"icon"}
                          className="h-4 w-4"
                          disabled={isLoading}
                          onClick={() => removePIC(i)}
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`Enter school PIC #${i + 1} name`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                key={field.id}
                name={`schoolAdmins.${i}.contact`}
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> School PIC #{i + 1} contact</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`Enter school PIC #${i + 1} contact`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldWrapper>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={isLoading}
            onClick={() => addPIC({ name: "", contact: "" })}
          >
            Add PIC
          </Button>
        </div>

        <SubmitButton isSubmitting={isLoading} />
      </form>
    </Form>
  );
};

export default AddSchoolForm;
