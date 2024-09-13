"use client";

import React from "react";

import {Container, Tabs, Title} from "@mantine/core";
import {useRouter, useSelectedLayoutSegment} from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export const SettingsPageLayout: React.FC<Props> = props => {
  const {children} = props;
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  const handleTabChange = (value: string | null) => {
    router.replace(`/settings/${value ?? "general"}`);
  }

  return (
    <Container p="md">
      <Title>
        設定
      </Title>
      <Tabs value={segment} onChange={handleTabChange} pt="sm">
        <Tabs.List>
          <Tabs.Tab value="general">
            一般
          </Tabs.Tab>
          <Tabs.Tab value="notification">
            通知
          </Tabs.Tab>
          <Tabs.Tab value="apperance">
            外観
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Container size="sm" py="md">
        {children}
      </Container>
    </Container>
  );
}
