"use client";

import { Box, BoxProps, Button, Grid, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type CurrencyFormType = {
  name: string;
  initialAmount: number;
};

type Props = BoxProps & {
  form: UseFormReturnType<CurrencyFormType>;
  handleSubmit: (values: CurrencyFormType) => void;
};

export const CurrencyForm = (props: Props) => {
  const { form, handleSubmit } = props;
  return (
    <Box {...props}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 8 }}>
              <TextInput
                label="通貨名"
                required
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 4 }}>
              <TextInput
                label="初期金額"
                type="number"
                required
                {...form.getInputProps("initialAmount")}
              />
            </Grid.Col>
          </Grid>
          <Button type="submit">追加</Button>
        </Stack>
      </form>
    </Box>
  );
};
