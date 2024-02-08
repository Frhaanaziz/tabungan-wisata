"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import {
  Form,
  FormDescription,
  FormItem,
  FormLabel,
} from "@ui/components/shadcn/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/components/shadcn/alert-dialog";

import { api } from "@/trpc/react";
import { toast } from "sonner";
import React from "react";
import { addWithdrawalSchema } from "@repo/validators/withdrawal";
import { School } from "@repo/types";
import SchoolFormField from "./SchoolFormField";
import { Input } from "@ui/components/shadcn/input";
import { Loader2Icon } from "lucide-react";
import { Button } from "@ui/components/shadcn/button";

type AddWithdrawalType = z.infer<typeof addWithdrawalSchema>;

const AddWithdrawalForm = ({
  userId,
  schools,
}: {
  userId: string;
  schools: School[];
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const defaultValues: AddWithdrawalType = {
    userId,
    schoolId: "",
  };

  const utils = api.useUtils();
  const form = useForm<AddWithdrawalType>({
    resolver: zodResolver(addWithdrawalSchema),
    defaultValues,
  });

  const { handleSubmit, control, reset, watch } = form;

  const { mutate, isLoading } = api.withdrawal.create.useMutation({
    onSuccess: async () => {
      toast.success("Withdrawal created!");
      reset(defaultValues);
      await utils.withdrawal.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const schoolId = watch("schoolId");
  const { data: withdrawalAmount, isFetching: isFetchingWithdrawalAmount } =
    api.withdrawal.getTotalAmount.useQuery(
      { schoolId },
      {
        enabled: !!schoolId,

        onError: (err) => {
          toast.error(err.message);
        },
      },
    );

  return (
    <Form {...form}>
      <form className="w-fit space-y-8 rounded-lg border p-6 shadow-md">
        <div className="space-y-5">
          <SchoolFormField
            schools={schools}
            control={control}
            name={"schoolId"}
          />
        </div>

        <FormItem>
          <FormLabel>Withdrawal Amount</FormLabel>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              className="w-fit"
              value={withdrawalAmount ?? 0}
              disabled
            />
            {isFetchingWithdrawalAmount && (
              <Loader2Icon className="h-5 w-5 animate-spin text-primary" />
            )}
          </div>
          <FormDescription>
            This is the total amount of withdrawals for the given school.
          </FormDescription>
        </FormItem>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button type="button" disabled={isLoading || !withdrawalAmount}>
              {isLoading && (
                <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently reset the
                user balance with the given school name.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* <AlertDialogAction asChild> */}
              <Button
                type="submit"
                variant={"destructive"}
                onClick={() => {
                  setIsDialogOpen(false);
                  handleSubmit((value) => mutate(value))();
                }}
              >
                Continue
              </Button>
              {/* </AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};

export default AddWithdrawalForm;
