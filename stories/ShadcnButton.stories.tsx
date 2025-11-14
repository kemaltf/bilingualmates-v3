import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/inputs/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "primary",
    size: "default",
    label: "Button",
    loading: false,
    pressed: false,
  },
  parameters: {
    controls: {
      include: ["variant", "size", "disabled", "label", "loading", "pressed"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

// legacy variants removed

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Medium: Story = {
  args: { size: "md" },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus className="size-4" />
        Add
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    children: <Plus className="size-4" />,
    "aria-label": "Add",
  },
};

export const DuoPrimary: Story = {
  args: { variant: "primary", size: "md" },
};

export const DuoBlue: Story = {
  args: { variant: "blue", size: "md" },
};

export const DuoGreen: Story = {
  args: { variant: "green", size: "md" },
};

export const DuoRed: Story = {
  args: { variant: "red", size: "md" },
};
