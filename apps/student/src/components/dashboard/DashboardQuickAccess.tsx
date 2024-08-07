import { companyContact } from "@repo/utils/constants";
import Link from "next/link";
import TopUpButton from "../TopUpButton";
import QuickAccessCard from "./QuickAccessCard";
import { env } from "@/env";
import { Event, EventRegistration, User } from "@repo/types";

type Props = {
  eventRegistrations: (EventRegistration & { event: Event })[];
  user: User;
};

const DashboardQuickAccess = async ({ eventRegistrations, user }: Props) => {
  const nearestEvent = eventRegistrations.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  )[0];
  const event = nearestEvent?.event;

  return (
    <>
      <h2 className="mb-5 text-xl font-semibold">Quick Access</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-10">
        <TopUpButton
          userId={user.id}
          TriggerComponent={
            <QuickAccessCard
              icon={"RiExchangeFundsLine"}
              text="Top Up"
              tooltip="add balance to your account"
              className="cursor-pointer"
            />
          }
        />

        <Link href={`https://wa.me/${companyContact}`} target="_blank">
          <QuickAccessCard
            icon={"RiCustomerService2Line"}
            text="CS"
            tooltip="customer service"
          />
        </Link>

        {event && (
          <Link
            href={`${env.NEXT_PUBLIC_FRONT_URL}/events/${event.id}`}
            target="_blank"
          >
            <QuickAccessCard
              icon={"RiCalendarEventLine"}
              text="Event"
              tooltip="your event details"
            />
          </Link>
        )}

        <QuickAccessCard
          icon={"RiLogoutBoxRLine"}
          text="Sign Out"
          tooltip="sign out from your account"
          className="cursor-pointer"
          forSignOut={true}
        />
      </div>
    </>
  );
};

export default DashboardQuickAccess;
