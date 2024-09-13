"use client";

import {useEffect, useState} from "react";

import {env} from "~/env";
import {sendMeNotification, subscribePush, unsubscribePush} from "~/features/pwa/actions";
import {flattenPushSubscription, urlBase64ToUint8Array} from "~/features/pwa/utils";

interface usePushNotificationReturnType {
  isSupported: boolean;
  isSubscribed: boolean;
  subscribeToPush: () => void;
  unsubscribeFromPush: () => void;
  sendTestNotification: (message: string) => void;
}

export const usePushNotification = (): usePushNotificationReturnType => {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  function registerServiceWorker() {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    }).then((registration) => {
      return registration.pushManager.getSubscription()
    }).then((sub) => {
      setSubscription(sub)
    }).catch((_e: unknown) => {
      throw new Error("サービスワーカーの登録に失敗しました")
    })
  }

  function subscribeToPush() {
    if (!isSupported) {
      throw new Error('このブラウザではプッシュ通知を利用できません')
    }
    if (subscription) {
      throw new Error('既にプッシュ通知を購読しています')
    }
    navigator.serviceWorker.ready.then((registration) => {
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      })
    }).then(async (sub) => {
      await subscribePush(flattenPushSubscription(sub))
      setSubscription(sub)
    }).catch((_e: unknown) => {
      throw new Error('プッシュ通知の購読開始処理に失敗しました')
    })
  }

  function unsubscribeFromPush() {
    if (!isSupported) {
      throw new Error('このブラウザではプッシュ通知を利用できません')
    }
    if (!subscription) {
      throw new Error('プッシュ通知を購読していません')
    }
    subscription.unsubscribe().then(() => {
      return unsubscribePush(flattenPushSubscription(subscription));
    }).then(() => {
      setSubscription(null)
    }).catch((_e: unknown) => {
      throw new Error('プッシュ通知の購読解除処理に失敗しました')
    })
  }

  function sendTestNotification(message: string) {
    sendMeNotification(message).catch(() => {
      throw new Error('通知の送信に失敗しました')
    })
  }

  return {
    isSupported,
    isSubscribed: !!subscription,
    subscribeToPush,
    unsubscribeFromPush,
    sendTestNotification,
  }
}
