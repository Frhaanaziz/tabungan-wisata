import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@ui/components/shadcn/button";

interface Props extends ButtonProps {
  isSubmitting: boolean;
  text?: string;
}

const SubmitButton = ({
  isSubmitting,
  disabled,
  text = "Submit",
  ...rest
}: Props) => {
  return (
    <Button type="submit" disabled={isSubmitting || disabled} {...rest}>
      {isSubmitting && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
};

export default SubmitButton;
