import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

type StoryProps = {
  size?: "sm" | "default"
  disabled?: boolean
}

function ControlledSelect({ size = "default", disabled = false }: StoryProps) {
  const [value, setValue] = useState<string>("system")
  return (
    <Select value={value} onValueChange={setValue} disabled={disabled}>
      <SelectTrigger size={size} className="w-80">
        <SelectValue placeholder="SYSTEM DEFAULT" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="system">System default</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  )
}

const meta: Meta<typeof ControlledSelect> = {
  title: "UI/inputs/Select",
  component: ControlledSelect,
  args: {
    size: "default",
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof ControlledSelect>

export const Default: Story = {}

export const Small: Story = {
  args: { size: "sm" },
}

export const Disabled: Story = {
  args: { disabled: true },
}