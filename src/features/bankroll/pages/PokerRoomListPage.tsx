import { NextPage } from "next";
import React from "react";
import { PokerRoomList } from "~/features/bankroll/components/PokerRoomList";
import { api } from "~/trpc/server";

export const PokerRoomListPage: NextPage = async () => {
  const data = await api.pokerRoom.get({});
  return <PokerRoomList data={data} />;
};
