'use client'

import React from 'react'

import {MantineColorScheme, Select, useMantineColorScheme} from "@mantine/core";

export function ColorSchemeSettings() {
  const {colorScheme, setColorScheme} = useMantineColorScheme()

  return (
    <Select
      label="テーマ"
      data={[
        {value: "auto", label: "自動"},
        {value: "light", label: "ライト"},
        {value: "dark", label: "ダーク"}
      ]}
      value={colorScheme}
      onChange={(value) => { setColorScheme(value as MantineColorScheme); }}
    />
  )
}
