import { Container, Title } from "@mantine/core";
import { CreatePokerRoomButton } from "~/features/bankroll/components/CreatePokerRoom";

export default async function ProtectedPage() {
  return (
    <Container size="md">
      <Title order={1}>Welcome to Potion</Title>
      <CreatePokerRoomButton />
    </Container>
  );
}
