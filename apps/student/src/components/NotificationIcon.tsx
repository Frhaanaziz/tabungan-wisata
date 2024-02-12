import { NotificationType } from "@repo/validators/notification";
import { PaymentStatus } from "@repo/validators/payment";
import {
  BellIcon,
  CircleDollarSignIcon,
  CircleEllipsisIcon,
  InfoIcon,
  XCircleIcon,
} from "lucide-react";

const NotificationIcon = ({
  type,
  status,
}: {
  type: NotificationType;
  status: PaymentStatus | undefined;
}) => {
  if (type === NotificationType.info) {
    return (
      <div className="rounded-full bg-blue-200 p-2.5">
        <InfoIcon className="h-5 w-5 text-background text-blue-700" />
      </div>
    );
  }

  if (type === NotificationType.transaction) {
    if (status === PaymentStatus.completed) {
      return (
        <div className="rounded-full bg-green-200 p-2.5">
          <CircleDollarSignIcon className="h-5 w-5 text-green-700" />
        </div>
      );
    } else if (status === PaymentStatus.failed) {
      return (
        <div className="rounded-full bg-red-200 p-2.5">
          <XCircleIcon className="h-5 w-5 text-background text-red-700" />
        </div>
      );
    } else if (status === PaymentStatus.pending) {
      return (
        <div className="rounded-full bg-yellow-200 p-2.5">
          <CircleEllipsisIcon className="h-5 w-5 text-background text-yellow-700" />
        </div>
      );
    }
  }

  return (
    <div className="rounded-full bg-blue-500 p-2.5">
      <BellIcon className="h-5 w-5 text-background" />
    </div>
  );
};

export default NotificationIcon;
