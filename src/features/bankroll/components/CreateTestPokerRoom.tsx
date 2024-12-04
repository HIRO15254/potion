"use client";

import { Button } from "@mantine/core";
import { api } from "~/trpc/react";

export const CreateTestPokerRoom = () => {
  const createPokerRoom = api.pokerRoom.create.useMutation();
  return (
    <Button
      onClick={() => {
        createPokerRoom.mutate({
          name: "testRoom",
          type: "live",
        });
      }}
    >
      テスト用ポーカールームの作成
    </Button>
  );
};
