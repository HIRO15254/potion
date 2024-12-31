import { Menu, MenuProps } from "@mantine/core";
import React from "react";

interface Props extends MenuProps {
  children: React.ReactNode;
  actions: {
    update: () => void;
    delete: () => void;
  };
}

export const PokerRoomMenu = (props: Props) => {
  const { children, actions } = props;
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={actions.update}>更新</Menu.Item>
        <Menu.Item color="red" onClick={actions.delete}>
          削除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
