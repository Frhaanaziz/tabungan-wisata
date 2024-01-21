import { PropsWithChildren } from "react";

const FormFieldWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-wrap items-center gap-5">{children}</div>;
};

export default FormFieldWrapper;
