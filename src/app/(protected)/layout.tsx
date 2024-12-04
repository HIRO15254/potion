import React from "react";

import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (session?.user == null) {
    redirect("/login");
  }
  return children;
}
