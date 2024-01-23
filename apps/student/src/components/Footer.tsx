import { companyName } from "@repo/utils/constants";
import { Github, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const navigation = [
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
  },
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
  },
  {
    name: "GitHub",
    href: "#",
    icon: Github,
  },
  {
    name: "YouTube",
    href: "#",
    icon: Youtube,
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-muted-foreground transition hover:text-foreground"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            &copy; 2024 {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
