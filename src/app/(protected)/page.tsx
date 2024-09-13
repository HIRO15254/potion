import React from "react";

import {Container, Title} from "@mantine/core";

export default function Home() {
  return (
    <Container>
      <div>
        <Title order={1}>Welcome to Potion</Title>
        <div>
          <h3>Documentation →</h3>
          <div>
            Learn more about Create T3 App, the libraries it uses, and how
            to deploy it.
          </div>
        </div>
      </div>
    </Container>
  );
}
