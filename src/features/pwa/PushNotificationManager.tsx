'use client'

import React, {useState} from 'react'

import {Button, Input, Paper, Stack, Switch, Text, Title} from "@mantine/core";

import {usePushNotification} from "~/features/pwa/usePushNotification";


export function PushNotificationManager() {
  const [message, setMessage] = useState('')
  const {
    isSupported,
    isSubscribed,
    subscribeToPush,
    unsubscribeFromPush,
    sendTestNotification,
  } = usePushNotification()

  if (!isSupported) {
    return (
      <Paper>
        <Title order={3}>プッシュ通知</Title>
        <Text>このブラウザではプッシュ通知を利用できません</Text>
      </Paper>
    )
  }

  return (
    <Paper w="420px" p="md">
      <Stack>
        <Title order={3}>プッシュ通知</Title>
        <Switch
          label="プッシュ通知を受け取る"
          checked={isSubscribed}
          onChange={isSubscribed ? unsubscribeFromPush : subscribeToPush}
        />
        {isSubscribed && (
          <>
            <Input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => { setMessage(e.target.value); }}
            />
            <Button onClick={() => { sendTestNotification(message); }}>テスト通知を送る</Button>
          </>
        )}
      </Stack>
    </Paper>
  )
}
