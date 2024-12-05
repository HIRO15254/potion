"use client";

import { Button, ButtonProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PokerRoomModal } from "~/features/bankroll/components/PokerRoomModal";
import { api } from "~/trpc/react";

export const CreatePokerRoomButton = (props: ButtonProps) => {
  const [opened, { open, close }] = useDisclosure();
  const createPokerRoom = api.pokerRoom.create.useMutation();
  return (
    <>
      <PokerRoomModal
        title="新規ポーカールームの作成"
        submitLabel="作成"
        opened={opened}
        onClose={close}
        pending={createPokerRoom.isPending}
        handleSubmit={(value) => {
          createPokerRoom.mutate(value, {
            onSuccess: () => {
              close();
            },
          });
        }}
      />
      <Button onClick={open} {...props}>
        テスト用ポーカールームの作成
      </Button>
    </>
  );
};
