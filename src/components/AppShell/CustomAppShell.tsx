'use client'

import React from 'react'

import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { CustomAppShellHeader } from '~/components/AppShell/CustomAppShellHeader'
import { CustomAppShellNavbar } from '~/components/AppShell/CustomAppShellNavbar'

interface Props {
  children: React.ReactNode
}

/**
 * [client] カスタムAppShellの見た目を定義
 */
export const CustomAppShell = (props: Props) => {
  const { children } = props
  const [opened, { toggle, close }] = useDisclosure(false)

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <CustomAppShellHeader opened={opened} toggle={toggle} />
      <CustomAppShellNavbar close={close} />
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
