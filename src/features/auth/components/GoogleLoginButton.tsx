import React from "react";

import {Button, ButtonProps} from "@mantine/core";

import {GoogleIcon} from "~/components/icons/GoogleIcon";
import {signIn} from "~/server/auth";

type Props = Omit<ButtonProps, "onClick"> & {
  callbackUrl?: string;
};

export const GoogleLoginButton: React.FC<Props> = props => {
  const {callbackUrl, ...rest} = props;

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {redirectTo: callbackUrl});
      }}
    >
      <Button type="submit" variant="default" color="gray" leftSection={<GoogleIcon size={20}/>} {...rest}>
        Googleでログイン
      </Button>
    </form>
  );
}
