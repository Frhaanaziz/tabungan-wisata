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
import { School } from "@repo/types";
import { Control } from "react-hook-form";
import { cn } from "@ui/lib/utils";

const SchoolFormField = ({
  schools,
  control,
  name,
}: {
  schools: School[];
  control: Control<any, any>;
  name: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="mb-2">School</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-fit min-w-56 justify-between"
              >
                {field.value
                  ? schools.find((school) => school.id === field.value)?.name
                  : "Select school..."}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit min-w-56 p-0" asChild>
              <Command>
                <CommandInput placeholder="Search school..." />
                <CommandEmpty>No school found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-60">
                    {schools.map((school) => (
                      <CommandItem
                        key={school.id}
                        value={`${school.name}!@#$$#@!${school.id}`}
                        onSelect={(currentValue) => {
                          const id = currentValue.split("!@#$$#@!").at(1);

                          if (id && id === field.value) field.onChange("");
                          else if (id) field.onChange(id);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === school.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {school.name}
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

export default SchoolFormField;
