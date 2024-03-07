import {
  Event,
  EventRegistration,
  Payment,
  School,
  SchoolAdmin,
  User,
  Withdrawal,
} from "@repo/types";
import xlsx, { IJsonSheet, ISettings } from "json-as-xlsx";
import { formatDateWithTime, toRupiah } from "@repo/utils";

type ExportSchoolDataProps = School & {
  users: (User & { payments: Payment[] })[];
  eventRegistrations: (EventRegistration & { event: Event })[];
  withdrawals: (Withdrawal & { user: User })[];
  schoolAdmins: SchoolAdmin[];
};

export const exportSchoolData = (school: ExportSchoolDataProps) => {
  const {
    name,
    code,
    address,
    contact,
    createdAt,
    eventRegistrations,
    schoolAdmins,
    users,
    withdrawals,
  } = school;

  const data: IJsonSheet[] = [
    {
      sheet: "School",
      columns: [
        { label: "Code", value: "code" },
        { label: "Name", value: "name" },
        { label: "Address", value: "address" },
        { label: "Contact", value: "contact" },
        {
          label: "Created At",
          value: (row: any) => formatDateWithTime(row.createdAt),
        },
      ],
      content: [{ code, name, address, contact, createdAt }],
    },
    {
      sheet: "School Admins",
      columns: [
        { label: "Name", value: "name" },
        { label: "Contact", value: "contact" },
      ],
      content: schoolAdmins,
    },
    {
      sheet: "Users",
      columns: [
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Role", value: "role" },
        { label: "Balance", value: (row: any) => toRupiah(row.balance) },
        {
          label: "Created At",
          value: (row: any) => formatDateWithTime(row.createdAt),
        },
      ],
      content: users.map((user) => ({ ...user })),
    },
    {
      sheet: "Event Registrations",
      columns: [
        { label: "Event", value: "event" },
        { label: "Cost", value: (row: any) => toRupiah(row.cost) },
        {
          label: "Start Date",
          value: (row: any) => formatDateWithTime(row.startDate),
        },
        {
          label: "End Date",
          value: (row: any) => formatDateWithTime(row.endDate),
        },
        {
          label: "Created At",
          value: (row: any) => formatDateWithTime(row.createdAt),
        },
      ],
      content: eventRegistrations.map((eventRegistration) => ({
        ...eventRegistration,
        event: eventRegistration.event.name,
      })),
    },
    {
      sheet: "Withdrawals",
      columns: [
        { label: "User", value: "user" },
        { label: "Amount", value: (row: any) => toRupiah(row.amount) },
        {
          label: "Created At",
          value: (row: any) => formatDateWithTime(row.createdAt),
        },
      ],
      content: withdrawals.map((withdrawal) => ({
        amount: withdrawal.amount,
        user: withdrawal.user.name,
        createdAt: withdrawal.createdAt,
      })),
    },
  ];

  const settings: ISettings = {
    fileName: `School-${name}`,
    writeMode: "writeFile",
  };

  return xlsx(data, settings);
};

export const exportUserData = (
  user: User & { payments: Omit<Payment, "user">[]; school?: School },
) => {
  const { name, email, role, balance, createdAt, payments, school } = user;

  const data: IJsonSheet[] = [
    {
      sheet: "User",
      columns: [
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Role", value: "role" },
        { label: "Balance", value: (row: any) => toRupiah(row.balance) },
        {
          label: "Created At",
          value: (row: any) => formatDateWithTime(row.createdAt),
        },
      ],
      content: [{ name, email, role, balance, createdAt }],
    },
    {
      sheet: "Payments",
      columns: [
        { label: "Amount", value: (row: any) => toRupiah(row.amount) },
        { label: "Status", value: "status" },
        { label: "Payment Method", value: "paymentMethod" },
        {
          label: "Created At",
          value: (row: any) => formatDateWithTime(row.createdAt),
        },
      ],
      content: payments,
    },
  ];

  if (school) {
    data.push({
      sheet: "School",
      columns: [
        { label: "Code", value: "code" },
        { label: "Name", value: "name" },
        { label: "Address", value: "address" },
        { label: "Contact", value: "contact" },
      ],
      content: [
        {
          code: school.code,
          name: school.name,
          address: school.address,
          contact: school.contact,
        },
      ],
    });
  }

  const settings: ISettings = {
    fileName: `User-${name}`,
    writeMode: "writeFile",
  };

  return xlsx(data, settings);
};
