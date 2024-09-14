import React from "react";

import {Title} from "@mantine/core";

import {PushNotificationSettings} from "../components/PushNotificationSettings";

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
