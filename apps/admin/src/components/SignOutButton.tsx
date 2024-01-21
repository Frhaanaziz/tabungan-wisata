"use client";
import { signOut } from "next-auth/react";
import { Button } from "@ui/components/button";

const SignOutButton = () => {
  return <Button onClick={() => signOut()}>Sign out</Button>;
};

export default SignOutButton;
