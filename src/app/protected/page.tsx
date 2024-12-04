import { Container, Title } from "@mantine/core";
import { CreateTestPokerRoom } from "~/features/bankroll/components/CreateTestPokerRoom";

export default async function ProtectedPage() {
  return (
    <Container size="md">
      <Title order={1}>Welcome to Potion</Title>
      <CreateTestPokerRoom />
    </Container>
  );
}
