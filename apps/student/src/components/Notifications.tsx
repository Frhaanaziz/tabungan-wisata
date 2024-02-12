"use client";
import { io } from "socket.io-client";
import {
  NotificationType,
  notificationSchema,
} from "@repo/validators/notification";
import { Button } from "@ui/components/shadcn/button";
import { getRelativeTimeString } from "@repo/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/shadcn/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ui/components/shadcn/hover-card";

import { BellIcon, ChevronRightIcon, ListChecksIcon } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import NotificationIcon from "./NotificationIcon";

type Notification = z.infer<typeof notificationSchema>;

const requestNotificationPermission = async ({
  setIsNotificationPermissionGranted,
  toasting = true,
}: {
  setIsNotificationPermissionGranted: Dispatch<SetStateAction<boolean>>;
  toasting?: boolean;
}) => {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") return;

  if (Notification.permission === "denied") {
    if (toasting)
      toast.error(
        "Please enable notification permission in your browser settings.",
      );
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") setIsNotificationPermissionGranted(true);
};

const sendNotification = async ({
  notification,
}: {
  notification: Notification;
}) => {
  if (!("Notification" in window) || Notification.permission !== "granted")
    return;

  const { type, message } = notification;

  const title =
    type === NotificationType.transaction && notification.status
      ? "Payment Notification"
      : "Info Notification";

  new Notification(title, {
    body: message,
    icon: "/images/user.png",
  });
};

const Notifications = ({ accessToken }: { accessToken: string }) => {
  const [isNotificationPermissionGranted, setIsNotificationPermissionGranted] =
    useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.isRead,
  );

  useEffect(() => {
    async function requestNotification() {
      await requestNotificationPermission({
        setIsNotificationPermissionGranted,
        toasting: false,
      });
    }
    requestNotification();

    const socket = io(`${env.NEXT_PUBLIC_WS_URL}/notifications`, {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    function handleRecentNotifications(data: Notification[]) {
      setNotifications(data);
    }

    function handleNewNotification(data: Notification) {}

    socket.on("recentNotifications", handleRecentNotifications);
    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("recentNotifications", handleRecentNotifications);
      socket.off("newNotification", handleNewNotification);
      socket.disconnect();
    };
  }, [accessToken]);

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          className="relative text-muted-foreground hover:text-primary/80"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {hasUnreadNotifications && (
            <span className="absolute right-3 top-2 h-2 w-2 animate-ping rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-96">
        <DropdownMenuLabel className="flex items-center justify-between gap-5">
          <span>Notifications</span>
          <Button
            variant={"ghost"}
            size={"icon"}
            disabled={!hasUnreadNotifications}
            className="h-8 w-8"
          >
            <ListChecksIcon className="h-5 w-5" />
            <span className="sr-only">Mark all as read</span>
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map(
          ({ type, status, id, message, createdAt, isRead }) => {
            return (
              <DropdownMenuItem
                key={id}
                className="relative flex items-center gap-3 py-2"
              >
                <NotificationIcon type={type} status={status} />
                <div className="space-y-1">
                  <p className="truncate">{message}</p>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <p className="inline-block text-xs text-muted-foreground hover:underline">
                        {getRelativeTimeString(createdAt)}
                      </p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit p-1.5 text-xs">
                      {new Date(createdAt).toLocaleString()}
                    </HoverCardContent>
                  </HoverCard>
                </div>
                {!isRead && (
                  <span className="absolute right-3 top-1/2 h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
              </DropdownMenuItem>
            );
          },
        )}

        {!notifications.length && (
          <div className="my-4 flex flex-col items-center justify-center gap-2">
            <Image
              src="/images/notifications-empty.svg"
              alt="Empty notifications"
              width={200}
              height={200}
            />
            <p className="font-semibold">Currently, nothing to report!</p>
            <p className="text-center text-sm text-muted-foreground">
              This area will light up with new notifications once <br />{" "}
              there&apos; activity in your dashboard
            </p>

            {!isNotificationPermissionGranted && (
              <Button
                size={"sm"}
                onClick={() =>
                  requestNotificationPermission({
                    setIsNotificationPermissionGranted,
                  })
                }
                className="mt-2"
              >
                Enable Notifications
              </Button>
            )}
          </div>
        )}

        {notifications.length >= 4 || isNotificationPermissionGranted ? (
          <>
            <DropdownMenuSeparator />
            <div className="mx-3 flex justify-between py-2">
              {!isNotificationPermissionGranted && (
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  onClick={() =>
                    requestNotificationPermission({
                      setIsNotificationPermissionGranted,
                    })
                  }
                  className="text-xs "
                >
                  Enable Notifications
                </Button>
              )}

              {notifications.length >= 4 && (
                <Link
                  href="/notifications"
                  className=" flex items-center gap-1.5 text-sm hover:underline"
                >
                  <span>View all</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              )}
            </div>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
