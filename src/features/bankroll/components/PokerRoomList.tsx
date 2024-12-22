"use client";

import {
  Box,
  Button,
  Container,
  Group,
  SimpleGrid,
  Stack,
  useMatches,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { PokerRoomCard } from "~/features/bankroll/components/PokerRoomCard";
import { useCreatePokerRoomModal } from "~/features/bankroll/hooks/useCreatePokerRoomModal";
import { useUpdatePokerRoomModal } from "~/features/bankroll/hooks/useUpdatePokerRoomModal";
import { getFileFromUrl } from "~/util/getFileFromUrl";

interface Props {
  data: {
    id: number;
    name: string;
    type: "live" | "online";
    memo: string | null;
    iconUrl: string | null;
    headerUrl: string | null;
  }[];
}

export const PokerRoomList: React.FC<Props> = (props) => {
  const { data } = props;
  const { modal: createPokerRoomModal, handleOpen: createPokerRoom } =
    useCreatePokerRoomModal();
  const { modal: updatePokerRoomModal, handleOpen: update } =
    useUpdatePokerRoomModal();
  const cardVariant = useMatches<"compact" | "default">({
    base: "compact",
    sm: "default",
  });

  return (
    <>
      {createPokerRoomModal}
      <Group justify="flex-end">
        <Button onClick={createPokerRoom} leftSection={<IconPlus />} mb="sm">
          新規作成
        </Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {data.map((room) => {
          return (
            <Box key={room.id}>
              {updatePokerRoomModal}
              <PokerRoomCard
                variant={cardVariant}
                pokerRoom={room}
                actions={{
                  update: async () => {
                    const icon = room.iconUrl
                      ? await getFileFromUrl(room.iconUrl, "設定済")
                      : null;
                    const header = room.headerUrl
                      ? await getFileFromUrl(room.headerUrl, "設定済")
                      : null;
                    update({
                      data: {
                        ...room,
                        icon,
                        header,
                      },
                    });
                  },
                }}
              />
            </Box>
          );
        })}
      </SimpleGrid>
    </>
  );
};
