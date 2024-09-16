'use client'

import React from 'react'

import { AppShell, Badge, Burger, Group, Text, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconJson, IconSettings } from '@tabler/icons-react'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
}

export const CustomAppShell = (props: Props) => {
  const { children } = props
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
              <Title order={2}>Potion</Title>
            </Link>
            <Badge color="teal" variant="light">Beta</Badge>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack>
          <Link href="/hogehoge" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Group>
              <IconJson size={20} />
              <Text>ほげほげ</Text>
            </Group>
          </Link>
          <Link href="/settings" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Group>
              <IconSettings size={20} />
              <Text>設定</Text>
            </Group>
          </Link>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
