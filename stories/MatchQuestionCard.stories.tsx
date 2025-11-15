import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { MatchQuestionCard } from "@/components/mcq/match-question-card"

const meta: Meta<typeof MatchQuestionCard> = {
  title: "Quiz/MatchQuestionCard",
  component: MatchQuestionCard,
  parameters: {
    layout: "centered",
    docs: {
      source: { state: "open" },
      description: {
        component: "Matching pairs question with mixed-media prompt (Duolingo-style).",
      },
    },
    controls: { expanded: true },
  },
  tags: ["autodocs"],
  args: {
    question: {
      id: "match-basic",
      prompt: { kind: "text", text: "Match the words to their translations" },
      textPrompt: "English ↔ Indonesian",
      leftItems: [
        { id: "l-hello", content: { kind: "text", text: "Hello" } },
        { id: "l-thanks", content: { kind: "text", text: "Thanks" } },
        { id: "l-please", content: { kind: "text", text: "Please" } },
      ],
      rightItems: [
        { id: "r-terima-kasih", content: { kind: "text", text: "Terima kasih" } },
        { id: "r-halo", content: { kind: "text", text: "Halo" } },
        { id: "r-tolong", content: { kind: "text", text: "Tolong" } },
      ],
      correctPairs: [
        { leftId: "l-hello", rightId: "r-halo" },
        { leftId: "l-thanks", rightId: "r-terima-kasih" },
        { leftId: "l-please", rightId: "r-tolong" },
      ],
    },
    matches: [],
    questionClassName: "max-w-[720px]",
    containerClassName: "md:grid-cols-2",
    showLabels: true,
    leftTitle: "Words",
    rightTitle: "Translations",
  },
  argTypes: {
    question: { description: "Match question data: prompt, leftItems, rightItems" },
    matches: { description: "Current matched pairs (controlled)" },
    onCreateMatch: { action: "match", description: "Create a match (leftId, rightId)" },
    questionClassName: { control: "text" },
    containerClassName: { control: "text" },
    showLabels: { control: "boolean" },
    leftTitle: { control: "text" },
    rightTitle: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof MatchQuestionCard>

function ControlledMatch(args: React.ComponentProps<typeof MatchQuestionCard>) {
  const [pairs, setPairs] = React.useState(args.matches ?? [])
  return (
    <MatchQuestionCard
      {...args}
      matches={pairs}
      onCreateMatch={(l, r) => setPairs((p) => [...p, { leftId: l, rightId: r }])}
    />
  )
}

export const Basic: Story = { render: (args) => <ControlledMatch {...args} /> }

export const AudioImageMixed: Story = {
  args: {
    question: {
      id: "match-mixed",
      prompt: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" },
      textPrompt: "Match audio and images to text",
      leftItems: [
        { id: "l-cat", content: { kind: "image", url: "https://picsum.photos/seed/cat/400/300", alt: "Cat" } },
        { id: "l-dog", content: { kind: "image", url: "https://picsum.photos/seed/dog/400/300", alt: "Dog" } },
      ],
      rightItems: [
        { id: "r-cat", content: { kind: "text", text: "Cat" }, clickSoundUrl: "https://www.w3schools.com/html/horse.mp3" },
        { id: "r-dog", content: { kind: "text", text: "Dog" }, clickSoundUrl: "https://www.w3schools.com/html/horse.mp3" },
      ],
    },
    containerClassName: "md:grid-cols-2",
  },
}

export const ThreeColumnsLayout: Story = {
  args: {
    containerClassName: "md:grid-cols-3",
  },
}

export const AllCorrect: Story = {
  render: (args) => {
    const correctPairs = [
      { leftId: "l-hello", rightId: "r-halo" },
      { leftId: "l-thanks", rightId: "r-terima-kasih" },
      { leftId: "l-please", rightId: "r-tolong" },
    ]
    return (
      <ControlledMatch
        {...args}
        question={{ ...args.question, correctPairs }}
        matches={correctPairs}
      />
    )
  },
}

export const SomeIncorrect: Story = {
  render: (args) => {
    const correctPairs = [
      { leftId: "l-hello", rightId: "r-halo" },
      { leftId: "l-thanks", rightId: "r-terima-kasih" },
      { leftId: "l-please", rightId: "r-tolong" },
    ]
    const wrongMatches = [
      { leftId: "l-hello", rightId: "r-terima-kasih" },
      { leftId: "l-thanks", rightId: "r-tolong" },
    ]
    return (
      <ControlledMatch
        {...args}
        question={{ ...args.question, correctPairs }}
        matches={wrongMatches}
      />
    )
  },
}