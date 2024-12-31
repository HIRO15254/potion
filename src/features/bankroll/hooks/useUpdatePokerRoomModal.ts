import { modals } from "@mantine/modals";

export const useUpdatePokerRoomModal = () => {
  type Args = {
    data: {
      id: number;
      name: string;
      type: "live" | "online";
      memo: string | null;
      icon: File | null;
      header: File | null;
    };
  };
  return (args: Args) => {
    const { data } = args;
    modals.openContextModal({
      size: "lg",
      modal: "updatePokerRoom",
      title: "ポーカールーム編集",
      innerProps: { data },
    });
  };
};
