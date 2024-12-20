"use client";

import { Modal } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import {
  PokerRoomForm,
  PokerRoomFormType,
} from "~/features/bankroll/components/PokerRoomForm";
import { api } from "~/trpc/react";
import { uploadFile } from "~/util/uploadFile";

export const useUpdatePokerRoomModal = () => {
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);

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
      }),
    ),
  });

  type HandleOpenArgs = {
    data: {
      id: number;
    } & PokerRoomFormType;
  };

  const handleOpen = (args: HandleOpenArgs) => {
    form.reset();
    form.setValues(args.data);
    setId(args.data.id);
    open();
  };

  const mutation = api.pokerRoom.update.useMutation({
    onSuccess: () => {
      close();
      router.refresh();
    },
  });

  const modal = (
    <Modal opened={opened} onClose={close} size="lg" title="ポーカールーム更新">
      <PokerRoomForm
        handleSubmit={async (values) => {
          const iconUrl =
            values.icon !== null
              ? values.icon.name === "設定済"
                ? undefined
                : await uploadFile({ file: values.icon }).then((ret) => ret.url)
              : null;
          const headerUrl =
            values.header !== null
              ? values.header.name === "設定済"
                ? undefined
                : await uploadFile({ file: values.header }).then(
                    (ret) => ret.url,
                  )
              : null;

          mutation.mutate({
            id: id || -1,
            ...values,
            iconUrl,
            headerUrl,
          });
        }}
        form={form}
        pending={mutation.isPending}
        submitLabel="更新"
      />
    </Modal>
  );

  return {
    modal,
    handleOpen,
  };
};
