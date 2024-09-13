import React from "react";

import {Container, Text, Title} from "@mantine/core";
import {redirect} from "next/navigation";

import {LoginForm} from "~/features/auth/components/LoginForm";
import {auth} from "~/server/auth";

interface LoginPageProps {
  searchParams: {
    callbackUrl: string;
  }
}

const LoginPage: React.FC<LoginPageProps> = async (props) => {
  const {searchParams} = props;
  await auth().then((session) => {
    if (session?.user) {
      redirect(searchParams.callbackUrl || "/");
    }
  })
  return (
    <Container maw={500} my={40}>
      <Title ta="center">
        ログイン
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        当アプリケーションの利用にはログインが必要です。
      </Text>
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
