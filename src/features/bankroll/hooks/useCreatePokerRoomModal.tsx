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
import { uploadFile } from "~/util/uploadFile";

export const useCreatePokerRoomModal = () => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure();
  const form = useForm<PokerRoomFormType>({
    initialValues: {
      name: "",
      type: "live",
      memo: "",
      icon: null,
      header: null,
    },
    validate: zodResolver(
      z.object({
        name: z.string().nonempty(),
        type: z.enum(["live", "online"]),
        memo: z.string().optional(),
        icon: z.any(),
        header: z.any(),
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
        handleSubmit={async (values) => {
          const iconUrl =
            values.icon !== null
              ? await uploadFile({ file: values.icon }).then((ret) => ret.url)
              : null;
          const headerUrl =
            values.header !== null
              ? await uploadFile({ file: values.header }).then((ret) => ret.url)
              : null;
          mutation.mutate({
            ...values,
            iconUrl,
            headerUrl,
          });
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
