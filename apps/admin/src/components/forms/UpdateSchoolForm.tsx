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
import { updateSchoolSchema } from "@repo/validators/school";
import { Textarea } from "@ui/components/shadcn/textarea";
import SubmitButton from "../SubmitButton";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import FormFieldWrapper from "./FormFieldWrapper";
import { Button } from "@ui/components/shadcn/button";
import { XIcon } from "lucide-react";

type UpdateSchoolType = z.infer<typeof updateSchoolSchema>;

const UpdateSchoolForm = ({ school }: { school: UpdateSchoolType }) => {
  const utils = api.useUtils();

  const form = useForm<UpdateSchoolType>({
    resolver: zodResolver(updateSchoolSchema),
    defaultValues: school,
  });

  const { handleSubmit, control } = form;

  const {
    fields,
    append: addPIC,
    remove: removePIC,
  } = useFieldArray({
    name: "schoolAdmins",
    control,
  });

  const { mutate, isLoading } = api.school.update.useMutation({
    onSuccess: async () => {
      toast.success("School updated successfully");
      await utils.school.getAllPaginated.invalidate();
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
                      {(!!i || fields.length > 1) && (
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

export default UpdateSchoolForm;
