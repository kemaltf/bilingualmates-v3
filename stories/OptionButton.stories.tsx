import type { Meta, StoryObj } from "@storybook/react";
import { OptionButton } from "@/components/ui/option-button";

const meta: Meta<typeof OptionButton> = {
  title: "UI/inputs/OptionButton",
  component: OptionButton,
  args: {
    children: "Isi pilihan",
    variant: "option-default",
    disabled: false,
    label: "A",
    showLabel: true,
    pressed: false,
  },
  parameters: {
    controls: { include: ["variant", "disabled", "label", "showLabel", "pressed", "children"], expanded: true },
    docs: { source: { state: "open" } },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: [
        "option-default",
        "option-selected",
        "option-correct",
        "option-incorrect",
        "option-disabled",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof OptionButton>;

export const Default: Story = {};
export const Selected: Story = { args: { variant: "option-selected" } };
export const Correct: Story = { args: { variant: "option-correct" } };
export const Incorrect: Story = { args: { variant: "option-incorrect" } };
export const Disabled: Story = { args: { variant: "option-disabled", disabled: true } };
export const WithoutLabel: Story = { args: { showLabel: false } };