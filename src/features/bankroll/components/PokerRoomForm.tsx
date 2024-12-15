import {
  Box,
  BoxProps,
  Button,
  Grid,
  Group,
  NativeSelect,
  Overlay,
  Stack,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { RichTextInput } from "~/component/RichTextInput";

export type PokerRoomFormType = {
  name: string;
  type: "live" | "online";
  memo: string;
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
