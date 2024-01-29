"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { cn, getInitials } from "@repo/utils";
import { Menu as MenuIcon, X } from "lucide-react";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
// import { ModeToggle } from "@/components/ModeToggler";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ui/components/shadcn/avatar";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/constant";
import logo from "@repo/assets/images/logo.png";
import { companyName } from "@repo/utils/constants";
import { Event } from "@repo/types";

export default function Header({
  session,
  events,
}: {
  session: Session;
  events: Omit<Event, "itineraries">[];
}) {
  const pathName = usePathname();
  const user = session.data;

  return (
    <Disclosure
      as="nav"
      className="border-b border-b-muted bg-background shadow"
    >
      {({ open, close }) => (
        <>
          <div className="container">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    width={32}
                    height={32}
                    src={logo}
                    alt={companyName}
                  />
                  <Image
                    className="hidden h-8 w-auto lg:block"
                    width={32}
                    height={32}
                    src={logo}
                    alt={companyName}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        item.href === pathName
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:border-muted hover:text-foreground",
                        "inline-flex items-center border-b-2 px-1 py-1 text-sm font-medium",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {events.map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className={cn(
                        `/events/${event.id}` === pathName
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:border-muted hover:text-foreground",
                        "inline-flex items-center border-b-2 px-1 py-1 text-sm font-medium",
                      )}
                    >
                      {event.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <ModeToggle /> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={user.image ?? "/"}
                          width={36}
                          height={36}
                          alt={user.name ?? ""}
                        />
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-lg ring-1 ring-border ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={cn(
                              active ? "bg-muted" : "",
                              "block w-full px-4 py-2 text-start text-sm text-foreground",
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

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  onClick={() => close()}
                  href={item.href}
                  className={cn(
                    item.href === pathName
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent text-muted-foreground hover:border-muted hover:bg-muted/70 hover:text-foreground",
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {events.map((event) => (
                <Link
                  key={event.name}
                  onClick={() => close()}
                  href={`/events/${event.id}`}
                  className={cn(
                    `/events/${event.id}` === pathName
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent text-muted-foreground hover:border-muted hover:bg-muted/70 hover:text-foreground",
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                  )}
                >
                  {event.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
