"use client";
import { Card, CardProps, Icon } from "@tremor/react";
import * as RemixIcon from "@remixicon/react";
import { cn } from "@ui/lib/utils";
import { signOut } from "next-auth/react";

interface Props extends CardProps {
  icon: keyof typeof RemixIcon;
  tooltip: string;
  text: string;
  forSignOut?: boolean;
}

const QuickAccessCard = ({
  icon,
  text,
  tooltip,
  className,
  forSignOut,
  ...rest
}: Props) => {
  return (
    <Card
      className={cn(
        "flex flex-col items-center gap-3 p-4 shadow-md",
        className,
      )}
      onClick={forSignOut ? () => signOut() : undefined}
      {...rest}
    >
      <Icon
        icon={RemixIcon[icon]}
        tooltip={tooltip}
        color="blue"
        variant="solid"
        size="md"
      />
      <p className="text-sm font-medium">{text}</p>
    </Card>
  );
};

export default QuickAccessCard;
