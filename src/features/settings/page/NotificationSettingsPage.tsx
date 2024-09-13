import React from "react";

import {Title} from "@mantine/core";

import {PushNotificationSettings} from "~/features/settings/components/PushNotificationSettings";

export const NotificationSettingsPage = () => {
  return (
    <>
      <Title order={3}>
        通知設定
      </Title>
      <PushNotificationSettings />
    </>
  );
}
