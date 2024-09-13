'use server'

import webpush, {PushSubscription} from 'web-push'

import {env} from '~/env'
import {api} from '~/trpc/server'

webpush.setVapidDetails(
  "mailto: <hi089697@gmail.com>",
  env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY
)

export async function subscribePush(sub: PushSubscription) {
  await api.pushSubscription.create(sub)
  return { success: true }
}

export async function unsubscribePush(sub: PushSubscription) {
  await api.pushSubscription.delete(sub)
  return { success: true }
}

export async function sendMeNotification(message: string) {
  try {
    const subscriptions = await api.pushSubscription.mySubscriptions()
    await Promise.all(
      subscriptions.map((sub) =>
        webpush.sendNotification(sub, JSON.stringify({
          title: 'Test Notification',
          body: message,
          icon: '/icon.png',
        }))
      )
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}
