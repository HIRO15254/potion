"use client";

import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export const useDeleteRoomModal = () => {
  const router = useRouter();
  const deleteMutation = api.pokerRoom.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  type Args = {
    data: {
      id: number;
      name: string;
    };
  };
  return (args: Args) => {
    const { data } = args;
    modals.openConfirmModal({
      title: "ポーカールーム削除",
      children: (
        <Text size="sm">
          {`ポーカールーム "${data.name}" を削除します。\nよろしいですか？`}
        </Text>
      ),
      labels: { confirm: "削除", cancel: "キャンセル" },
      confirmProps: { color: "red" },
      onConfirm: async () => deleteMutation.mutate({ id: data.id }),
    });
  };
};
