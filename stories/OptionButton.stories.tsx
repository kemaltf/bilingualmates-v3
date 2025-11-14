import type { Meta, StoryObj } from "@storybook/react";
import { OptionButton } from "@/components/ui/option-button";

const meta: Meta<typeof OptionButton> = {
  title: "UI/inputs/OptionButton",
  component: OptionButton,
  args: {
    children: "Pilihan",
    variant: "option-default",
    disabled: false,
  },
  parameters: {
    controls: { include: ["variant", "disabled"] },
  },
};

export default meta;
type Story = StoryObj<typeof OptionButton>;

export const Default: Story = {};
export const Selected: Story = { args: { variant: "option-selected" } };
export const Correct: Story = { args: { variant: "option-correct" } };
export const Incorrect: Story = { args: { variant: "option-incorrect" } };
export const Disabled: Story = { args: { variant: "option-disabled", disabled: true } };