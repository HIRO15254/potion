"use client";

import {
  Accordion,
  AspectRatio,
  Box,
  BoxProps,
  Button,
  FileInput,
  Grid,
  Group,
  NativeSelect,
  Stack,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { RichTextInput } from "~/component/RichTextInput";
import { PokerRoomCard } from "~/features/bankroll/components/PokerRoomCard";

export type PokerRoomFormType = {
  name: string;
  type: "live" | "online";
  memo: string | null;
  icon: File | null;
  header: File | null;
};

type PokerRoomFormProps = BoxProps & {
  submitLabel?: string;
  loading?: boolean;
  pending?: boolean;
  handleSubmit: (values: PokerRoomFormType) => void;
  form: UseFormReturnType<PokerRoomFormType>;
};

export const PokerRoomForm = (props: PokerRoomFormProps) => {
  const { handleSubmit, submitLabel, loading, pending, form, ...others } =
    props;
  return (
    <Box {...others}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 8 }}>
              <TextInput
                label="ポーカールーム名"
                disabled={pending}
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 4 }}>
              <NativeSelect
                label="タイプ"
                data={[
                  { value: "live", label: "ライブ" },
                  { value: "online", label: "オンライン" },
                ]}
                disabled={pending}
                {...form.getInputProps("type")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 4 }}>
              <FileInput
                label="アイコン"
                description="推奨サイズ: 128×128"
                accept="image/*"
                clearable
                {...form.getInputProps("icon")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 8 }}>
              <FileInput
                label="ヘッダー"
                description="推奨サイズ: 1500×500"
                accept="image/*"
                clearable
                {...form.getInputProps("header")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <RichTextInput label="メモ" {...form.getInputProps("memo")} />
            </Grid.Col>
          </Grid>
          <Group justify="flex-end">
            <Button type="submit" loading={pending}>
              {submitLabel ?? "決定"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};
