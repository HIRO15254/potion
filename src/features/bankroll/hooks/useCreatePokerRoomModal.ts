import { modals } from "@mantine/modals";

export const useCreatePokerRoomModal = () => {
  return () =>
    modals.openContextModal({
      size: "lg",
      modal: "createPokerRoom",
      title: "新規ポーカールーム作成",
      innerProps: {},
    });
};
