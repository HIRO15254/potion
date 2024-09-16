import React from 'react'

import { Container, Text, Title } from '@mantine/core'

export const GeneralSettingsPage: React.FC = () => {
  return (
    <Container size="sm" py="md">
      <Title order={3} pb="lg">
        一般設定
      </Title>
      <Text c="dimmed">
        現在設定項目はありません。
      </Text>
    </Container>
  )
}
