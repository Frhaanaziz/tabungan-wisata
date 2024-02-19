import { cn } from "@ui/lib/utils";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

const FormFieldWrapper = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-5", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default FormFieldWrapper;
