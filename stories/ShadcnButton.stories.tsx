import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/inputs/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
  parameters: {
    controls: { include: ["variant", "size", "disabled"] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Link: Story = {
  args: { variant: "link" },
};

export const Destructive: Story = {
  args: { variant: "destructive" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
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
