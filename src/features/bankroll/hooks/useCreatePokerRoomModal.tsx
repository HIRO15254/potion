"use client";

import { Modal } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import {
  PokerRoomForm,
  PokerRoomFormType,
} from "~/features/bankroll/components/PokerRoomForm";
import { api } from "~/trpc/react";

export const useCreatePokerRoomModal = () => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure();
  const form = useForm<PokerRoomFormType>({
    initialValues: {
      name: "",
      type: "live",
      memo: "",
    },
    validate: zodResolver(
      z.object({
        name: z.string().nonempty(),
        type: z.enum(["live", "online"]),
        memo: z.string().optional(),
      }),
    ),
  });

  const mutation = api.pokerRoom.create.useMutation({
    onSuccess: () => {
      close();
      router.refresh();
    },
  });

  const handleOpen = () => {
    form.reset();
    open();
  };

  const modal = (
    <Modal
      opened={opened}
      onClose={close}
      size="lg"
      title="新規ポーカールーム作成"
    >
      <PokerRoomForm
        handleSubmit={(values) => {
          mutation.mutate(values);
        }}
        form={form}
        pending={mutation.isPending}
        submitLabel="作成"
      />
    </Modal>
  );

  return {
    modal,
    handleOpen,
  };
};
