'use client'

import React from 'react'

import {Stack, Switch, Text} from "@mantine/core";

import {usePushNotification} from "~/features/pwa/usePushNotification";

export function PushNotificationSettings() {
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
    <Stack pt="md">
      <Switch
        label="プッシュ通知を受け取る"
        checked={isSubscribed}
        onChange={isSubscribed ? unsubscribeFromPush : subscribeToPush}
      />
    </Stack>
  )
}
