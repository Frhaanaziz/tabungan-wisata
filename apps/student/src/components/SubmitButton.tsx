import { Loader2 } from "lucide-react";
import { Button } from "@ui/components/button";

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
      Submit
    </Button>
  );
};

export default SubmitButton;
