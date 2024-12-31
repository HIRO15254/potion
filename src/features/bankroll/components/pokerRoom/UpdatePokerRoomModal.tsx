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

type Props = ContextModalProps<{
  data: {
    id: number;
  } & PokerRoomFormType;
}>;

export const UpdatePokerRoomModal = (props: Props) => {
  const { context, id, innerProps } = props;
  const router = useRouter();

  const form = useForm<PokerRoomFormType>({
    initialValues: {
      ...innerProps.data,
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
      context.closeModal(id);
      router.refresh();
    },
  });

  return (
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
              : await uploadFile({ file: values.header }).then((ret) => ret.url)
            : null;

        mutation.mutate({
          ...values,
          id: innerProps.data.id,
          iconUrl,
          headerUrl,
        });
      }}
      form={form}
      pending={mutation.isPending}
      submitLabel="更新"
    />
  );
};
