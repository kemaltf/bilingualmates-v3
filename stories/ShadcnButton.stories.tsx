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
      include: ["variant", "size", "disabled", "label", "loading", "pressed", "onFocus"],
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

export const DuoPurple: Story = {
  args: { variant: "purple", size: "md" },
};

export const DuoAmber: Story = {
  args: { variant: "amber", size: "md" },
};

export const DuoIndigo: Story = {
  args: { variant: "indigo", size: "md" },
};

export const DuoText: Story = {
  args: { variant: "text", size: "md", children: "Learn more" },
};

export const OnFocus: Story = {
  args: {
    size: "md",
    label: "Focus Me",
    onFocus: () => {}
  },
};

export const DuoDisabled: Story = {
  args: { variant: "disabled", size: "md", label: "Disabled" },
};

export const OutlineBlue: Story = {
  args: { variant: "outline-blue", size: "md", children: "Outline Blue" },
};

export const OutlineGreen: Story = {
  args: { variant: "outline-green", size: "md", children: "Outline Green" },
};

export const OutlineRed: Story = {
  args: { variant: "outline-red", size: "md", children: "Outline Red" },
};

export const OutlinePurple: Story = {
  args: { variant: "outline-purple", size: "md", children: "Outline Purple" },
};

export const OutlineAmber: Story = {
  args: { variant: "outline-amber", size: "md", children: "Outline Amber" },
};

export const OutlineIndigo: Story = {
  args: { variant: "outline-indigo", size: "md", children: "Outline Indigo" },
};
