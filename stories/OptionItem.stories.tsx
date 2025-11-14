import type { Meta, StoryObj } from "@storybook/react"
import OptionItem from "@/components/molecules/OptionItem"

const meta: Meta<typeof OptionItem> = {
  title: "UI/inputs/OptionItem",
  component: OptionItem,
  args: {
    label: "A",
    variant: "option-correct",
    children: <div className="text-sm">Contoh konten</div>,
    disabled: false,
    pressed: false,
    className: "",
    showLabel: true,
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
}

export default meta
type Story = StoryObj<typeof OptionItem>

export const Example: Story = {}