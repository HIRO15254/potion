"use client";

import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Group,
  Stack,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import React from "react";
import { PokerRoomMenu } from "~/features/bankroll/components/pokerRoom/PokerRoomMenu";
import { PokerRoomTypeBadge } from "~/features/bankroll/components/pokerRoom/PokerRoomTypeBadge";

interface Props {
  data: {
    id: number;
    name: string;
    type: "live" | "online";
    memo: string | null;
    iconUrl: string | null;
    headerUrl: string | null;
  };
}

export const PokerRoomDetail = (props: Props) => {
  const { data } = props;

  return (
    <Stack>
      <Breadcrumbs>
        <Anchor href="/bankroll">バンクロール</Anchor>
        <Anchor href="/bankroll/pokerroom">ポーカールーム</Anchor>
        <Anchor href={`/bankroll/pokerroom/${data.id}`}>{data.name}</Anchor>
      </Breadcrumbs>
      <Group justify="space-between">
        <Group>
          <Title order={1} pb="sm">
            {data.name}
          </Title>
          <PokerRoomTypeBadge type={data.type} />
        </Group>
        <Group>
          <PokerRoomMenu
            actions={{
              update: () => {},
              delete: () => {},
            }}
          >
            <ActionIcon variant="transparent" color="dark">
              <IconDotsVertical />
            </ActionIcon>
          </PokerRoomMenu>
        </Group>
      </Group>
      {data.memo && data.memo != "<p></p>" && (
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: data.memo }} />
        </TypographyStylesProvider>
      )}
    </Stack>
  );
};
