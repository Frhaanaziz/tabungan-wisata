import { Payment, School, User } from "@repo/types";
import xlsx, { IJsonSheet, ISettings } from "json-as-xlsx";
import { formatDateWithTime, toRupiah } from "@repo/utils";

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
