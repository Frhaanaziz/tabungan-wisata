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
  isRead,
}: {
  type: NotificationType;
  status: PaymentStatus | undefined;
  isRead?: boolean;
}) => {
  if (type === NotificationType.info) {
    return (
      <div className="relative rounded-full bg-blue-200 p-2.5">
        <InfoIcon className="h-5 w-5 text-background text-blue-700" />
        {!isRead && (
          <span className="absolute left-0.5 top-0.5 h-2  w-2 rounded-full bg-red-500" />
        )}
      </div>
    );
  }

  if (type === NotificationType.transaction) {
    if (status === PaymentStatus.completed) {
      return (
        <div className="relative rounded-full bg-green-200 p-2.5">
          <CircleDollarSignIcon className="h-5 w-5 text-green-700" />
          {!isRead && (
            <span className="absolute left-0.5 top-0.5 h-2  w-2 rounded-full bg-red-500" />
          )}
        </div>
      );
    } else if (status === PaymentStatus.failed) {
      return (
        <div className="relative rounded-full bg-red-200 p-2.5">
          <XCircleIcon className="h-5 w-5 text-background text-red-700" />
          {!isRead && (
            <span className="absolute left-0.5 top-0.5 h-2  w-2 rounded-full bg-red-500" />
          )}
        </div>
      );
    } else if (status === PaymentStatus.pending) {
      return (
        <div className="relative rounded-full bg-yellow-200 p-2.5">
          <CircleEllipsisIcon className="h-5 w-5 text-background text-yellow-700" />
          {!isRead && (
            <span className="absolute left-0.5 top-0.5 h-2  w-2 rounded-full bg-red-500" />
          )}
        </div>
      );
    }
  }

  return (
    <div className="relative rounded-full bg-blue-500 p-2.5">
      <BellIcon className="h-5 w-5 text-background" />
      {!isRead && (
        <span className="absolute left-0.5 top-0.5 h-2  w-2 rounded-full bg-red-500" />
      )}
    </div>
  );
};

export default NotificationIcon;
