"use client";

import { useForm, zodResolver } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import {
  PokerRoomForm,
  PokerRoomFormType,
} from "~/features/bankroll/components/pokerRoom/PokerRoomForm";
import { api } from "~/trpc/react";
import { uploadFile } from "~/util/uploadFile";

type Props = ContextModalProps;

export const CreatePokerRoomModal = (props: Props) => {
  const { context, id } = props;
  const router = useRouter();

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
      context.closeModal(id);
      router.refresh();
    },
  });

  return (
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
  );
};
