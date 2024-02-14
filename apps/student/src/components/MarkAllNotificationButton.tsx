"use client";
import { api } from "@/trpc/react";
import { Button } from "@ui/components/shadcn/button";
import { ListChecksIcon } from "lucide-react";

const MarkAllNotificationButton = ({
  hasUnreadNotifications,
}: {
  hasUnreadNotifications: boolean;
}) => {
  const utils = api.useUtils();

  const { mutate: markAllNotification } =
    api.notification.markAllNotification.useMutation({
      async onSuccess() {
        await utils.notification.invalidate();
      },
    });

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      disabled={!hasUnreadNotifications}
      onClick={() => markAllNotification()}
      className="h-8 w-8"
    >
      <ListChecksIcon className="h-6 w-6" />
      <span className="sr-only">Mark all notification as read</span>
    </Button>
  );
};

export default MarkAllNotificationButton;
