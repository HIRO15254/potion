import React from 'react'

import { AppShellNavbar, AppShellNavbarProps, Group, Stack, Text, UnstyledButton } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

interface Props extends AppShellNavbarProps {
  close: () => void
}

export const CustomAppShellNavbar: React.FC<Props> = (props) => {
  const { close, ...others } = props
  const router = useRouter()

  interface LinksProps {
    href: string
    icon: React.ReactNode
  }

  const Links: React.FC<LinksProps> = (props) => {
    const { href, icon } = props
    const handleClick = () => {
      close()
      router.push(href)
    }
    return (
      <UnstyledButton onClick={handleClick}>
        <Group>
          {icon}
          <Text>設定</Text>
        </Group>
      </UnstyledButton>
    )
  }

  return (
    <AppShellNavbar p="md" {...others}>
      <Stack>
        <Links href="/settings" icon={<IconSettings size={20} />} />
      </Stack>
    </AppShellNavbar>
  )
}
