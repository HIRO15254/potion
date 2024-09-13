import React from "react";

import {Button, ButtonProps} from "@mantine/core";

import {signOut} from "~/server/auth";

type Props = Omit<ButtonProps, "onClick">

export const LogoutButton: React.FC<Props> = props => {
  const {...rest} = props;
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" {...rest}>
        Logout
      </Button>
    </form>
  )
}
