import React from "react";

import {Paper, Stack} from "@mantine/core";

import {DiscordLoginButton} from "~/features/auth/components/DiscordLoginButton";
import {GoogleLoginButton} from "~/features/auth/components/GoogleLoginButton";

export const LoginForm: React.FC = () => {
  return (
    <Paper withBorder shadow="md" p={30} mt={30}>
      <Stack>
        <GoogleLoginButton w="100%" />
        <DiscordLoginButton w="100%" />
      </Stack>
    </Paper>
  )
}
