"use client";

import { Fragment, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ui/components/shadcn/avatar";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { cn } from "@ui/lib/utils";
import {
  BellDotIcon,
  ChevronDownIcon,
  CreditCardIcon,
  HomeIcon,
  MenuIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@ui/components/shadcn/button";
import { Event } from "@repo/types";
import { getInitials } from "@repo/utils";
import { env } from "@/env";
import Notifications from "./Notifications";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { companyName } from "@repo/utils/constants";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, title: "Dashboard Overview" },
  {
    name: "Transactions",
    href: "/transactions",
    icon: CreditCardIcon,
    title: "",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: BellDotIcon,
    title: "",
  },
];

type Props = {
  events: Event[];
  session: Session;
  highlightedEvents: Event[];
};

const Sidebar = ({ events, session, highlightedEvents }: Props) => {
  const userSession = session.data;

  const pathName = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const popularEvents = highlightedEvents.slice(0, 3);

  const title = navigation.find((item) => item.href === pathName)?.title ?? "";

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-muted-foreground/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-foreground"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col overflow-y-auto bg-background px-6 pb-4">
                  <div className="my-3 flex h-16 shrink-0 items-center">
                    <Image
                      className="h-10 w-auto"
                      src="/images/logo-light.png"
                      width={1417}
                      height={380}
                      alt={companyName}
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => {
                            const current = pathName === item.href;

                            return (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={cn(
                                    current
                                      ? "bg-muted text-primary"
                                      : "text-muted-foreground hover:bg-muted hover:text-primary",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <item.icon
                                    className={cn(
                                      current
                                        ? "text-primary/80"
                                        : "text-muted-foreground/80 group-hover:text-primary/80",
                                      "h-6 w-6 shrink-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-muted-foreground">
                          Your Events
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {events.map(({ name, id }) => {
                            const current = pathName === `/events/${id}`;

                            return (
                              <li key={id}>
                                <Link
                                  href={`${env.NEXT_PUBLIC_FRONT_URL}/events/${id}`}
                                  className={cn(
                                    current
                                      ? "bg-muted text-primary"
                                      : "text-muted-foreground hover:bg-muted hover:text-primary",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      current
                                        ? "border-primary text-primary"
                                        : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-background text-[0.625rem] font-medium",
                                    )}
                                  >
                                    {name[0]}
                                  </span>
                                  <span className="truncate">{name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-muted-foreground">
                          Popular Events
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {popularEvents.map(({ name, id }) => {
                            const current = pathName === `/events/${id}`;

                            return (
                              <li key={id}>
                                <Link
                                  href={`${env.NEXT_PUBLIC_FRONT_URL}/events/${id}`}
                                  className={cn(
                                    current
                                      ? "bg-muted text-primary"
                                      : "text-muted-foreground hover:bg-muted hover:text-primary",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      current
                                        ? "border-primary text-primary"
                                        : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-background text-[0.625rem] font-medium",
                                    )}
                                  >
                                    {name[0]}
                                  </span>
                                  <span className="truncate">{name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <Link
                          href="/settings"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-muted-foreground hover:bg-muted hover:text-primary"
                        >
                          <SettingsIcon
                            className="h-6 w-6 shrink-0 text-muted-foreground/80 group-hover:text-primary/80"
                            aria-hidden="true"
                          />
                          Settings
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col overflow-y-auto border-r border-border bg-background px-6 pb-4">
          <div className="my-3 flex h-16 shrink-0 items-center">
            <Image
              className="h-10 w-auto"
              src="/images/logo-light.png"
              width={1417}
              height={380}
              alt={companyName}
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const current = pathName === item.href;

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            current
                              ? "bg-muted text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-primary",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <item.icon
                            className={cn(
                              current
                                ? "text-primary/80"
                                : "text-muted-foreground group-hover:text-primary/80",
                              "h-6 w-6 shrink-0",
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-muted-foreground">
                  Your Events
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {events.map(({ name, id }) => {
                    const current = pathName === `/events/${id}`;

                    return (
                      <li key={id}>
                        <Link
                          href={`${env.NEXT_PUBLIC_FRONT_URL}/events/${id}`}
                          className={cn(
                            current
                              ? "bg-muted text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-primary",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <span
                            className={cn(
                              current
                                ? "border-primary text-primary"
                                : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary",
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-background text-[0.625rem] font-medium",
                            )}
                          >
                            {name[0] ?? ""}
                          </span>
                          <span className="truncate">{name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-muted-foreground">
                  Popular Events
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {popularEvents.map(({ name, id }) => {
                    const current = pathName === `/events/${id}`;

                    return (
                      <li key={id}>
                        <Link
                          href={`${env.NEXT_PUBLIC_FRONT_URL}/events/${id}`}
                          className={cn(
                            current
                              ? "bg-muted text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-primary",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <span
                            className={cn(
                              current
                                ? "border-primary text-primary"
                                : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary",
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-background text-[0.625rem] font-medium",
                            )}
                          >
                            {name[0] ?? ""}
                          </span>
                          <span className="truncate">{name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  href="/settings"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-muted-foreground hover:bg-muted hover:text-primary"
                >
                  <SettingsIcon
                    className="h-6 w-6 shrink-0 text-muted-foreground/80 group-hover:text-primary/80"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant={"ghost"}
            type="button"
            className="-m-2.5 p-2.5 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Button>

          {/* Separator */}
          <div className="h-6 w-px bg-border lg:hidden" aria-hidden="true" />

          <h1 className="hidden font-semibold sm:block">{title}</h1>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Notifications accessToken={session.accessToken} />

              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-border"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <Avatar>
                    <AvatarImage
                      src={userSession?.image ?? "/images/avatar-fallback.svg"}
                    />
                    <AvatarFallback>
                      {getInitials(userSession.name)}
                    </AvatarFallback>
                  </Avatar>

                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-foreground"
                      aria-hidden="true"
                    >
                      {userSession.name}
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-background py-2 shadow-lg ring-1 ring-border focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/settings"
                          className={cn(
                            active ? "bg-muted" : "",
                            "block w-full px-3 py-1 text-start text-sm leading-6 text-muted-foreground",
                          )}
                        >
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={cn(
                            active ? "bg-muted" : "",
                            "block w-full px-3 py-1 text-start text-sm leading-6 text-muted-foreground",
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        {/* <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main> */}
      </div>
    </>
  );
};

export default Sidebar;
