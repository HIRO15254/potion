"use client";

import { Button, Container, Stack } from "@mantine/core";
import React from "react";
import { PokerRoomCard } from "~/features/bankroll/components/PokerRoomCard";
import { useCreatePokerRoomModal } from "~/features/bankroll/hooks/useCreatePokerRoomModal";
import { useUpdatePokerRoomModal } from "~/features/bankroll/hooks/useUpdatePokerRoomModal";

interface Props {
  data: {
    id: number;
    name: string;
    type: "live" | "online";
    memo: string | null;
  }[];
}

export const PokerRoomList: React.FC<Props> = (props) => {
  const { data } = props;
  const { modal: createPokerRoomModal, handleOpen: createPokerRoom } =
    useCreatePokerRoomModal();
  const { modal: updatePokerRoomModal, handleOpen: updatePokerRoom } =
    useUpdatePokerRoomModal();
  return (
    <>
      {createPokerRoomModal}
      {updatePokerRoomModal}
      <Container size="md">
        <Button onClick={createPokerRoom}>ポーカールーム作成</Button>
        <Stack>
          {data.map((room) => (
            <PokerRoomCard
              key={room.id}
              pokerRoom={room}
              actions={{
                update: () => updatePokerRoom(room.id),
              }}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
};
