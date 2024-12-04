import { Title } from "@mantine/core";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <Title order={1}>Welcome to Potion</Title>
    </HydrateClient>
  );
}
