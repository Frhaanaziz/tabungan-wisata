"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/shadcn/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/shadcn/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@ui/components/shadcn/command";
import { Button } from "@ui/components/shadcn/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { ScrollArea } from "@ui/components/shadcn/scroll-area";
import { Event } from "@repo/types";
import { Control } from "react-hook-form";
import { cn } from "@ui/lib/utils";
import { Skeleton } from "@ui/components/shadcn/skeleton";

const EventFormField = ({
  events,
  control,
  name,
}: {
  events: Event[] | undefined;
  control: Control<any, any>;
  name: string;
}) => {
  if (!events)
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-10 w-56" />
      </div>
    );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="mb-2">Event</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-fit min-w-56 justify-between"
              >
                {field.value
                  ? events.find((event) => event.id === field.value)?.name
                  : "Select event..."}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit min-w-56 p-0" asChild>
              <Command>
                <CommandInput placeholder="Search event..." />
                <CommandEmpty>No event found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-60">
                    {events.map((event) => (
                      <CommandItem
                        key={event.id}
                        value={`${event.name}!@#$$#@!${event.id}`}
                        onSelect={(currentValue) => {
                          const id = currentValue.split("!@#$$#@!").at(1);

                          if (id && id === field.value) field.onChange("");
                          else if (id) field.onChange(id);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === event.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {event.name}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EventFormField;
