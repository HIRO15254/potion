import { CreatePokerRoomModal } from "~/features/bankroll/components/pokerRoom/CreatePokerRoomModal";
import { UpdatePokerRoomModal } from "~/features/bankroll/components/pokerRoom/UpdatePokerRoomModal";

export const modals = {
  createPokerRoom: CreatePokerRoomModal,
  updatePokerRoom: UpdatePokerRoomModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
