import {PushSubscription as WebPushSubscription} from 'web-push'

export const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const flattenPushSubscription = (sub: PushSubscription): WebPushSubscription => {
  const ret = sub.toJSON()
  if (
    typeof ret.endpoint === 'string'
    && ret.keys?.p256dh && ret.keys.auth
  ) {
    return {
      endpoint: ret.endpoint,
      keys: {
        p256dh: ret.keys.p256dh,
        auth: ret.keys.auth,
      }
    }
  }
  throw new Error('Invalid PushSubscription')
}
