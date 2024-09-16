'use client'

import React from 'react'

import { MantineColorScheme, Select, SelectProps, useMantineColorScheme } from '@mantine/core'

type Props = Omit<SelectProps, 'data' | 'value' | 'onChange'>

/**
 * [client] カラーテーマ設定コンポーネント
 */
export const ColorSchemeSettings: React.FC<Props> = (props) => {
  const { ...others } = props
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  return (
    <Select
      label="テーマ"
      data={[
        { value: 'auto', label: '自動' },
        { value: 'light', label: 'ライト' },
        { value: 'dark', label: 'ダーク' },
      ]}
      value={colorScheme}
      onChange={(value) => { setColorScheme(value as MantineColorScheme) }}
      {...others}
    />
  )
}
