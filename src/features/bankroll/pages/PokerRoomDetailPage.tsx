import { Container } from "@mantine/core";
import { notFound } from "next/navigation";
import React from "react";
import { api } from "~/trpc/server";
import { PokerRoomDetail } from "../components/pokerRoom/PokerRoomDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export const PokerRoomDetailPage = async (props: Props) => {
  const { id } = await props.params;
  const data = await api.pokerRoom.detail({ id: parseInt(id) });
  if (!data) {
    notFound();
  }
  return (
    <Container size="md" py="md">
      <PokerRoomDetail data={data} />
    </Container>
  );
};
