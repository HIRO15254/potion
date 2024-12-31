import { Badge, BadgeProps } from "@mantine/core";
import React from "react";

interface Props extends BadgeProps {
  type: "live" | "online";
}

export const PokerRoomTypeBadge = (props: Props) => {
  const { type, ...other } = props;
  return (
    <Badge color={type === "live" ? "teal" : "blue"} {...other}>
      {type}
    </Badge>
  );
};
