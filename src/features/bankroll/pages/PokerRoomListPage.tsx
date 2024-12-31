import { Container, Title } from "@mantine/core";
import { NextPage } from "next";
import React from "react";
import { PokerRoomList } from "~/features/bankroll/components/pokerRoom/PokerRoomList";
import { api } from "~/trpc/server";

export const PokerRoomListPage: NextPage = async () => {
  const data = await api.pokerRoom.getAll();
  return (
    <Container size="md" py="md">
      <Title order={1} pb="sm">
        ポーカールーム一覧
      </Title>
      <PokerRoomList data={data} />
    </Container>
  );
};
