"use client";
import { io } from "socket.io-client";
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
import { useEffect, useState } from "react";
import NotificationIcon from "./NotificationIcon";
import { api } from "@/trpc/react";
import { Notification } from "@repo/types";

const Notifications = ({ accessToken }: { accessToken: string }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.isRead,
  );

  const { mutate: markAllNotification } =
    api.notification.markAllNotification.useMutation({
      onMutate() {
        setNotifications(
          notifications.map((notification) => ({
            ...notification,
            isRead: true,
          })),
        );
      },
    });

  useEffect(() => {
    const socket = io(`${env.NEXT_PUBLIC_WS_URL}/notifications`, {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    function handleRecentNotifications(data: Notification[]) {
      setNotifications(data);
    }

    socket.on("recentNotifications", handleRecentNotifications);

    return () => {
      socket.off("recentNotifications", handleRecentNotifications);
      socket.disconnect();
    };
  }, [accessToken]);

  return (
    <>
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
        <DropdownMenuContent align="end" className="min-w-96 max-w-[375px]">
          <DropdownMenuLabel className="flex items-center justify-between gap-5">
            <span>Notifications</span>
            <Button
              variant={"ghost"}
              size={"icon"}
              disabled={!hasUnreadNotifications}
              onClick={() => markAllNotification()}
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
                  <NotificationIcon
                    type={type}
                    status={status}
                    isRead={isRead}
                  />
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
            </div>
          )}

          {notifications.length >= 4 ? (
            <>
              <DropdownMenuSeparator />
              <div className="mx-3 flex justify-end py-2">
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
    </>
  );
};

export default Notifications;
