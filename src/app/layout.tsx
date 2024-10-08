import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/nprogress/styles.css'

import React from 'react'

import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core'
import { Analytics } from '@vercel/analytics/react'

import { TRPCReactProvider } from '~/trpc/react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Potion',
  description: 'Tools for Japanese poker players',
  icons: [{ rel: 'icon', url: '/favicons/favicon.ico' }],
}

const theme = createTheme({})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <TRPCReactProvider>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <Analytics />
            {children}
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
