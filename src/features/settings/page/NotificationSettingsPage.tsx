import React from 'react'

import { Container, Title } from '@mantine/core'

import { PushNotificationSettings } from '../components/PushNotificationSettings'

export const NotificationSettingsPage: React.FC = () => {
  return (
    <Container size="sm" py="md">
      <Title order={3} pb="lg">
        通知設定
      </Title>
      <PushNotificationSettings />
    </Container>
  )
}
