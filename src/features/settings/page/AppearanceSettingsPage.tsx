import React from 'react'

import { Container, Title } from '@mantine/core'

import { ColorSchemeSettings } from '../components/ColorSchemeSettings'

export const AppearanceSettingsPage: React.FC = () => {
  return (
    <Container size="sm" py="md">
      <Title order={3} pb="lg">
        外観設定
      </Title>
      <ColorSchemeSettings />
    </Container>
  )
}
