import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import ClozeQuestionCard from "@/components/mcq/cloze-question-card"

const meta: Meta<typeof ClozeQuestionCard> = {
  title: "Quiz/ClozeQuestionCard",
  component: ClozeQuestionCard,
  parameters: {
    layout: "centered",
    docs: {
      source: { state: "open" },
      description: {
        component: "Fill in the Blank / Cloze question. Stateless, hanya interaksi input/select.",
      },
    },
    controls: { expanded: true },
  },
  tags: ["autodocs"],
  args: {
    prompt: { kind: "text", text: "Complete the sentence:" },
    segments: [
      { kind: "text", text: "I " },
      { kind: "blank", blank: { id: "b1", options: ["go", "went", "gone"], placeholder: "_____" } },
      { kind: "text", text: " to school every day." },
    ],
    value: { b1: "go" },
    locked: false,
  },
  argTypes: {
    prompt: { description: "Media prompt" },
    segments: { description: "Text and blank segments" },
    value: { description: "Answers keyed by blank id" },
    onChange: { action: "change" },
    locked: { control: "boolean" },
    className: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof ClozeQuestionCard>

function ControlledCloze(args: React.ComponentProps<typeof ClozeQuestionCard>) {
  const [answers, setAnswers] = React.useState<Record<string, string>>(args.value ?? {})
  return (
    <ClozeQuestionCard
      {...args}
      value={answers}
      onChange={(next) => {
        setAnswers(next)
        args.onChange?.(next)
      }}
    />
  )
}

export const Basic: Story = { render: (args) => <ControlledCloze {...args} /> }

export const WithTextInputBlank: Story = {
  render: (args) => <ControlledCloze {...args} />,
  args: {
    segments: [
      { kind: "text", text: "She " },
      { kind: "blank", blank: { id: "b1", options: ["goes", "went", "gone"], placeholder: "_____" } },
      { kind: "text", text: " to the market." },
    ],
    value: { b1: "goes" },
  },
}

export const LockedState: Story = {
  render: (args) => <ControlledCloze {...args} />,
  args: {
    locked: true,
  },
}

export const MultipleBlanks: Story = {
  render: (args) => <ControlledCloze {...args} />,
  args: {
    prompt: { kind: "text", text: "Fill in all blanks:" },
    segments: [
      { kind: "text", text: "I " },
      { kind: "blank", blank: { id: "b1", options: ["am", "is", "are"], placeholder: "_____" } },
      { kind: "text", text: " " },
      { kind: "blank", blank: { id: "b2", options: ["learning", "learned", "learn"], placeholder: "_____" } },
      { kind: "text", text: " English." },
    ],
    value: { b1: "am" },
  },
}

export const ClickToUndo: Story = {
  render: (args) => <ControlledCloze {...args} />,
  args: {
    prompt: { kind: "text", text: "Tap blank again to clear" },
    segments: [
      { kind: "text", text: "They " },
      { kind: "blank", blank: { id: "b1", options: ["are", "is"], placeholder: "_____" } },
      { kind: "text", text: " " },
      { kind: "blank", blank: { id: "b2", options: ["playing", "played"], placeholder: "_____" } },
      { kind: "text", text: " outside." },
    ],
    value: { b1: "are", b2: "playing" },
  },
}