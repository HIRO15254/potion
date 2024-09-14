import React from "react";

import {Title} from "@mantine/core";
import {ColorSchemeSettings} from "../components/ColorSchemeSettings";

export const AppearanceSettingsPage = () => {
  return (
    <>
      <Title order={3}>
        外観設定
      </Title>
      <ColorSchemeSettings />
    </>
  );
}
