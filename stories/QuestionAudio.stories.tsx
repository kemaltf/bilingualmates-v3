import type { Meta, StoryObj } from "@storybook/react"
import { MCQuestionCard } from "@/components/mcq/mc-question-card"
import type { MCQuestion } from "@/lib/quiz/types"

function QuestionAudio({ showOptionLabel = true, questionClassName = "max-w-[420px] mx-auto" }: { showOptionLabel?: boolean; questionClassName?: string }) {
  const question: MCQuestion = {
    id: "q-audio-all",
    prompt: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" },
    options: [
      { id: "a", content: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" } },
      { id: "b", content: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" } },
      { id: "c", content: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" } },
    ],
    correctOptionId: "a",
  }

  return (
    <MCQuestionCard
      question={question}
      selectedOptionId={null}
      onSelectOption={() => {}}
      showOptionLabel={showOptionLabel}
      questionClassName={questionClassName}
    />
  )
}

const meta: Meta<typeof QuestionAudio> = {
  title: "Components/QuestionAudio",
  component: QuestionAudio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A specialized audio-based question component for listening exercises. All options are audio-based with optional text descriptions, similar to Duolingo's listening comprehension exercises.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    showOptionLabel: true,
    questionClassName: "max-w-[420px] mx-auto",
  },
  argTypes: {
    showOptionLabel: { control: "boolean" },
    questionClassName: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof QuestionAudio>

export const Primary: Story = {}