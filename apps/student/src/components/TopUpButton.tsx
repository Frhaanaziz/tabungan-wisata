"use client";

import { Dialog, DialogContent, DialogTrigger } from "@ui/components/dialog";
import { buttonVariants } from "@ui/components/ui/button";

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
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { getErrorMessage } from "@repo/utils";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { addPaymentSchema } from "@repo/validators/payment";
import SubmitButton from "./SubmitButton";
import React from "react";
import { useSnap } from "@/lib/hooks/useSnap";

type AddPaymentType = z.infer<typeof addPaymentSchema>;

const TopUpButton = ({ userId }: { userId: string }) => {
  const toastId = React.useId();
  const { snapPopUp } = useSnap();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const defaultValues: AddPaymentType = {
    amount: 0,
    userId,
  };

  const form = useForm<AddPaymentType>({
    resolver: zodResolver(addPaymentSchema),
    defaultValues,
  });
  const { handleSubmit, control, reset } = form;

  const { mutate: createPayment, isLoading } = api.payment.create.useMutation({
    onSuccess: ({ token }) => {
      reset(defaultValues);
      // TODO: Create success, error, etc page
      // TODO: Add query key on every api call for caching

      snapPopUp({ toastId, token });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
    onSettled: () => {
      setIsDialogOpen(false);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className={buttonVariants()}>Top up</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit((v) => createPayment(v))}
            className="space-y-6"
          >
            <FormField
              control={control}
              name="amount"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={1} />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you want to top up in rupiah (Rp).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton isSubmitting={isLoading} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpButton;
