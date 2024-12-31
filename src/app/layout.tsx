import React from "react";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";

import { Box, ColorSchemeScript, MantineProvider } from "@mantine/core";
import { type Metadata } from "next";

import { ModalsProvider } from "@mantine/modals";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CustomAppShell } from "~/component/CustomAppShell";
import { loginProtection } from "~/features/auth/loginProtection";
import { TRPCReactProvider } from "~/trpc/react";

import { modals } from "~/util/modals";

export const metadata: Metadata = {
  title: "Potion",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await loginProtection();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <TRPCReactProvider>
          <SpeedInsights />
          <MantineProvider>
            <ModalsProvider modals={modals}>
              <CustomAppShell>
                <Box m="sm">{children}</Box>
              </CustomAppShell>
            </ModalsProvider>
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
