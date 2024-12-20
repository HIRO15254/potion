"use client";

import {
  ActionIcon,
  AspectRatio,
  Badge,
  Card,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import React from "react";

interface Props {
  actions: {
    update: () => void;
  };
  pokerRoom: {
    name: string;
    type: "live" | "online";
    memo: string | null;
    headerUrl?: string | null;
    iconUrl?: string | null;
  };
}

export const PokerRoomCard: React.FC<Props> = (props) => {
  const { pokerRoom, actions } = props;

  const menu = (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent" color="dark">
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={actions.update}>更新</Menu.Item>
        <Menu.Item color="red">削除</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <Card withBorder radius="md">
      {pokerRoom.headerUrl && (
        <Card.Section mb="sm">
          <AspectRatio ratio={3} w="100%">
            <img width="100%" src={pokerRoom.headerUrl} alt="" />
          </AspectRatio>
        </Card.Section>
      )}
      <Group justify="space-between">
        <Text fz="md" fw={750}>
          {pokerRoom.name}
        </Text>
        <Group>
          <Badge color={pokerRoom.type === "live" ? "teal" : "blue"}>
            {pokerRoom.type}
          </Badge>
          {menu}
        </Group>
      </Group>
    </Card>
  );
};
