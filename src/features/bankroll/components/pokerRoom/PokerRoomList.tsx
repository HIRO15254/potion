"use client";

import { Box, Card, Group, SimpleGrid, Text, useMatches } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { useCreatePokerRoomModal } from "~/features/bankroll/hooks/useCreatePokerRoomModal";
import { useDeleteRoomModal } from "~/features/bankroll/hooks/useDeleteRoomModal";
import { useUpdatePokerRoomModal } from "~/features/bankroll/hooks/useUpdatePokerRoomModal";
import { getFileFromUrl } from "~/util/getFileFromUrl";
import { PokerRoomCard } from "./PokerRoomCard";

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
  const create = useCreatePokerRoomModal();
  const update = useUpdatePokerRoomModal();
  const deleteMutation = useDeleteRoomModal();
  const cardVariant = useMatches<"compact" | "default">({
    base: "compact",
    sm: "default",
  });

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {data.map((room) => {
          const handleUpdate = async () => {
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
          };

          return (
            <Box key={room.id}>
              <PokerRoomCard
                variant={cardVariant}
                pokerRoom={room}
                actions={{
                  update: handleUpdate,
                  delete: () => deleteMutation({ data: room }),
                }}
              />
            </Box>
          );
        })}
        <Card onClick={create} withBorder>
          <Group>
            <IconPlus />
            <Text>新規作成</Text>
          </Group>
        </Card>
      </SimpleGrid>
    </>
  );
};
