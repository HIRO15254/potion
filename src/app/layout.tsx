import React from "react";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import { Box, ColorSchemeScript, MantineProvider } from "@mantine/core";
import { type Metadata } from "next";

import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Potion",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (session?.user == null) {
    redirect("/api/auth/signin");
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <TRPCReactProvider>
          <MantineProvider>
            <Box m="sm">{children}</Box>
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
