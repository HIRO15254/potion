import React from "react";

import {Button, ButtonProps} from "@mantine/core";

import {DiscordIconFilled} from "~/components/icons/DiscordIcon";
import {signIn} from "~/server/auth";

type Props = Omit<ButtonProps, "onClick"> & {
  callbackUrl?: string;
};

export const DiscordLoginButton: React.FC<Props> = props => {
  const {callbackUrl, ...rest} = props;

  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord", {redirectTo: callbackUrl});
      }}
    >
      <Button type="submit" leftSection={<DiscordIconFilled size={20} fill="#fff"/>} color="#5865F2" {...rest}>
        Discordでログイン
      </Button>
    </form>
  );
}
