"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ui/components/shadcn/dialog";
import { buttonVariants } from "@ui/components/shadcn/button";

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
import { Input } from "@ui/components/shadcn/input";
import { getErrorMessage } from "@repo/utils";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { addPaymentSchema } from "@repo/validators/payment";
import SubmitButton from "./SubmitButton";
import React from "react";
import { useSnap } from "@/lib/hooks/useSnap";

type AddPaymentType = z.infer<typeof addPaymentSchema>;

interface Props {
  userId: string;
  TriggerComponent?: JSX.Element;
}

const TopUpButton = ({ userId, TriggerComponent }: Props) => {
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
      <DialogTrigger
        className={!!TriggerComponent ? "" : buttonVariants()}
        asChild={!!TriggerComponent}
      >
        {TriggerComponent ? TriggerComponent : "Top Up"}
      </DialogTrigger>
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
