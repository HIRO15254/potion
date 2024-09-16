'use client'

import React from 'react'

import { Switch, SwitchProps, Text } from '@mantine/core'

import { usePushNotification } from '~/features/pwa/usePushNotification'

type Props = Omit<SwitchProps, 'checked' | 'onChange'>

/**
 * [client] プッシュ通知設定コンポーネント
 */
export const PushNotificationSettings: React.FC<Props> = (props) => {
  const { ...others } = props
  const {
    isSupported,
    isSubscribed,
    subscribeToPush,
    unsubscribeFromPush,
  } = usePushNotification()

  if (!isSupported) {
    return (
      <Text c="dimmed">このブラウザではプッシュ通知を利用できません</Text>
    )
  }

  return (
    <Switch
      label="プッシュ通知を受け取る"
      checked={isSubscribed}
      onChange={isSubscribed ? unsubscribeFromPush : subscribeToPush}
      {...others}
    />
  )
}
