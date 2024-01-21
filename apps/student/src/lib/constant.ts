import { env } from "@/env";

export const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Event", href: "/event" },
];
