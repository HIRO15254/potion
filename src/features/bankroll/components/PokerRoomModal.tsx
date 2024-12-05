import {
  Button,
  Group,
  Modal,
  ModalProps,
  NativeSelect,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type PokerRoomModalFormType = {
  name: string;
  type: "live" | "online";
};

type PokerRoomModalProps = ModalProps & {
  submitLabel?: string;
  loading?: boolean;
  pending?: boolean;
  handleSubmit: (values: PokerRoomModalFormType) => void;
};

export const PokerRoomModal = (props: PokerRoomModalProps) => {
  const { handleSubmit, submitLabel, loading, pending, ...others } = props;
  const form = useForm<PokerRoomModalFormType>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      type: "live",
    },
  });

  return (
    <Modal {...others} overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <TextInput label="ポーカールーム名" {...form.getInputProps("name")} />
          <NativeSelect
            label="タイプ"
            data={["live", "online"]}
            {...form.getInputProps("type")}
          />
          <Group justify="flex-end">
            <Button type="submit" loading={pending}>
              {submitLabel ?? "決定"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
