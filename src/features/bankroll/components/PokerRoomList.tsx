"use client";

import { Box, Button, Container, Stack } from "@mantine/core";
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
  return (
    <>
      {createPokerRoomModal}
      <Container size="md">
        <Button onClick={createPokerRoom}>ポーカールーム作成</Button>
        <Stack>
          {data.map((room) => {
            return (
              <Box key={room.id}>
                {updatePokerRoomModal}
                <PokerRoomCard
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
        </Stack>
      </Container>
    </>
  );
};
