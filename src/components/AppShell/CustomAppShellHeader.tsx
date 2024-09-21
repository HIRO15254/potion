import React from 'react'

import { AppShellHeader, Badge, Burger, Group, Title } from '@mantine/core'
import Link from 'next/link'

interface Props {
  opened: boolean
  toggle: () => void
}

/**
 * カスタムAppShellのヘッダー部分
 * @param props
 * @package
 */
export const CustomAppShellHeader: React.FC<Props> = (props) => {
  const { opened, toggle } = props
  return (
    <AppShellHeader>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Title order={2}>Potion</Title>
          </Link>
          <Badge color="teal" variant="light">Beta</Badge>
        </Group>
      </Group>
    </AppShellHeader>
  )
}
