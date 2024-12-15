"use client";

import { LoadingOverlay, Modal } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { z } from "zod";
import {
  PokerRoomForm,
  PokerRoomFormType,
} from "~/features/bankroll/components/PokerRoomForm";
import { api } from "~/trpc/react";

export const useUpdatePokerRoomModal = () => {
  const router = useRouter();
  const [id, setId] = React.useState<number | null>(null);
  const { refetch, isPending } = api.pokerRoom.get.useQuery(
    {
      id: id || 0,
    },
    {
      enabled: false,
    },
  );
  useEffect(() => {
    const update = async () => {
      if (id) {
        const { data } = await refetch();
        if (!data || data.length != 1 || !data[0]) {
          throw new Error("Failed to fetch data");
        }
        const newData = data[0];
        form.setValues({
          name: newData.name,
          type: newData.type,
          memo: newData.memo || "",
        });
      }
    };
    update();
  }, [id]);
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

  const mutation = api.pokerRoom.update.useMutation({
    onSuccess: () => {
      close();
      router.refresh();
    },
  });

  const handleOpen = async (id: number) => {
    form.reset();
    setId(id);
    open();
  };

  const modal = (
    <Modal opened={opened} onClose={close} size="lg" title="ポーカールーム更新">
      <PokerRoomForm
        handleSubmit={(values) => {
          if (id === null) {
            throw new Error("id is null");
          }
          mutation.mutate({
            id: id,
            ...values,
          });
        }}
        form={form}
        pending={mutation.isPending}
        submitLabel="更新"
      />
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Modal>
  );

  return {
    modal,
    handleOpen,
  };
};
