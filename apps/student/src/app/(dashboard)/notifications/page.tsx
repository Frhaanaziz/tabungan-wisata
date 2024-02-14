import MarkAllNotificationButton from "@/components/MarkAllNotificationButton";
import { SearchDataTable } from "@/components/data-table/SearchDataTable";
import { notificationColumn } from "@/components/data-table/columns/NotificationColumn";
import { api } from "@/trpc/server";
import { Suspense } from "react";

const NotificationsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = (searchParams.page as string) || "1";
  const search = (searchParams.search as string) || "";

  const data = await api.user.getNotificationsPaginated.query({
    page: parseInt(page),
    search,
  });

  const { content, ...utils } = data;

  const hasUnreadNotifications = content.some(
    (notification) => !notification.isRead,
  );

  return (
    <div className="container min-h-[calc(100vh-105px-112px)]">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay up-to-date on transactions, alerts, and other updates.
          </p>
        </div>
        <MarkAllNotificationButton
          hasUnreadNotifications={hasUnreadNotifications}
        />
      </header>

      <section className="mt-16">
        <Suspense fallback={null}>
          <SearchDataTable
            utils={utils}
            data={content}
            columns={notificationColumn}
            emptyState="No notifications."
          />
        </Suspense>
      </section>
    </div>
  );
};

export default NotificationsPage;
