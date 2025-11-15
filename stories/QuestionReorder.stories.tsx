import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import QuestionReorder from "@/components/mcq/question-reorder"

const meta: Meta<typeof QuestionReorder> = {
  title: "Quiz/QuestionReorder",
  component: QuestionReorder,
  parameters: {
    layout: "centered",
    docs: {
      source: { state: "open" },
      description: {
        component: "Sentence builder ala Duolingo. Hanya mengelola interaksi memilih dan mengurutkan token.",
      },
    },
    controls: { expanded: true },
  },
  tags: ["autodocs"],
  args: {
    tokens: ["I", "am", "learning", "English"],
    value: [],
    prompt: "Arrange the words",
    disabled: false,
  },
  argTypes: {
    tokens: { description: "Shuffled input tokens" },
    value: { description: "Selected tokens in order" },
    onChange: { action: "change" },
    prompt: { control: "text" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    answerClassName: { control: "text" },
    bankClassName: { control: "text" },
    feedbackStatus: { control: "radio", options: ["idle", "correct", "incorrect"], description: "Visual feedback style only (no correctness logic)" },
    incorrectFromIndex: { control: "number", description: "Start index for incorrect styling when feedbackStatus is 'incorrect'" },
  },
}

export default meta
type Story = StoryObj<typeof QuestionReorder>

function ControlledReorder(args: React.ComponentProps<typeof QuestionReorder>) {
  const [val, setVal] = React.useState<string[]>(args.value ?? [])
  return (
    <QuestionReorder
      {...args}
      value={val}
      onChange={(updated) => setVal(updated)}
    />
  )
}

export const Basic: Story = { render: (args) => <ControlledReorder {...args} /> }

export const Disabled: Story = {
  render: (args) => <ControlledReorder {...args} />,
  args: { disabled: true },
}

export const PreSelected: Story = {
  render: (args) => <ControlledReorder {...args} />,
  args: { value: ["I", "am"] },
}

export const LongSentence: Story = {
  render: (args) => <ControlledReorder {...args} />,
  args: {
    tokens: [
      "Learning",
      "a",
      "new",
      "language",
      "is",
      "fun",
      "and",
      "challenging",
    ],
    prompt: "Build the sentence",
  },
}

export const CustomStyles: Story = {
  render: (args) => <ControlledReorder {...args} />,
  args: {
    answerClassName: "py-4",
    bankClassName: "gap-3",
    className: "max-w-[720px]",
  },
}

export const CorrectOrder: Story = {
  render: (args) => <ControlledReorder {...args} />,
  args: {
    tokens: ["I", "am", "learning", "English"],
    value: ["I", "am", "learning", "English"],
    feedbackStatus: "correct",
  },
}

export const IncorrectOrder: Story = {
  render: (args) => <ControlledReorder {...args} />,
  args: {
    tokens: ["I", "am", "learning", "English"],
    value: ["I", "English", "am", "learning"],
    feedbackStatus: "incorrect",
    incorrectFromIndex: 1,
  },
}