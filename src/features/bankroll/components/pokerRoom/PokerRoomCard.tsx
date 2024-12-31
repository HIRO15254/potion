"use client";

import { ActionIcon, AspectRatio, Card, Group, Text } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { PokerRoomMenu } from "~/features/bankroll/components/pokerRoom/PokerRoomMenu";
import { PokerRoomTypeBadge } from "~/features/bankroll/components/pokerRoom/PokerRoomTypeBadge";

interface Props {
  variant?: "default" | "compact";
  actions: {
    update: () => void;
    delete: () => void;
  };
  pokerRoom: {
    id: number;
    name: string;
    type: "live" | "online";
    memo: string | null;
    headerUrl?: string | null;
    iconUrl?: string | null;
  };
}

export const PokerRoomCard: React.FC<Props> = (props) => {
  const { variant = "default", pokerRoom, actions } = props;

  return (
    <Card withBorder radius="md">
      {variant == "default" && pokerRoom.headerUrl && (
        <Card.Section mb="sm">
          <AspectRatio ratio={3} w="100%">
            <img src={pokerRoom.headerUrl} alt="" />
          </AspectRatio>
        </Card.Section>
      )}
      <Group justify="space-between">
        <Group>
          {pokerRoom.iconUrl && (
            <AspectRatio ratio={1} w={32} mr="xs">
              <img src={pokerRoom.iconUrl} alt="" />
            </AspectRatio>
          )}
          <Link href={`/bankroll/pokerroom/${pokerRoom.id}`}>
            <Text fz="md" fw={750}>
              {pokerRoom.name}
            </Text>
          </Link>
        </Group>
        <Group>
          <PokerRoomTypeBadge type={pokerRoom.type} />
          <PokerRoomMenu actions={actions}>
            <ActionIcon variant="transparent" color="dark">
              <IconDotsVertical />
            </ActionIcon>
          </PokerRoomMenu>
        </Group>
      </Group>
    </Card>
  );
};
