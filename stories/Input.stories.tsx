import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Check } from "lucide-react";

function ControlledInput(args: React.ComponentProps<typeof Input>) {
  const [value, setValue] = useState(args.value as string);
  return <Input {...args} value={value} onChange={setValue} />;
}

const meta: Meta<typeof Input> = {
  title: "UI/inputs/Input",
  component: Input,
  args: {
    value: "",
    placeholder: "Type your answer…",
    status: "idle",
    disabled: false,
  },
  parameters: {
    controls: { include: ["status", "disabled", "placeholder", "helperText"] },
  },
  render: (args) => <ControlledInput {...args} />,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Idle: Story = {};

export const Correct: Story = {
  args: { status: "correct", helperText: "Jawaban benar" },
};

export const Incorrect: Story = {
  args: { status: "incorrect", helperText: "Coba lagi" },
};

export const WithPrefixSuffix: Story = {
  args: {
    prefix: <Search className="size-4" />,
    suffix: <Check className="size-4" />,
  },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Dinonaktifkan" },
};

export const WithHelper: Story = {
  args: { helperText: "Gunakan bahasa target Anda" },
};
