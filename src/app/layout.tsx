import React from "react";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import { ColorSchemeScript, Container, MantineProvider } from "@mantine/core";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Potion",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <TRPCReactProvider>
          <MantineProvider defaultColorScheme="dark">
            <Container size="md" my="sm">
              {children}
            </Container>
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
