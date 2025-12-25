import type { Meta, StoryObj } from "@storybook/react";
import { TheoryQuestionCard } from "@/components/shared/quiz/theory-question-card";
import type { TheoryQuestion } from "@/lib/quiz/types";

const sampleTheoryQuestion: TheoryQuestion = {
  id: "theory-1",
  title: "Which is this?",
  content:
    "<p>Keep an eye out for words that change based on gender and case! We'll talk about these ones more in depth later.</p>",
  media: [
    {
      kind: "image",
      url: "https://picsum.photos/800/400",
      caption: "Friends meeting up",
    },
  ],
  audioSamples: [
    {
      audioUrl: "https://www.w3schools.com/html/horse.mp3",
      text: "Ich treffe meine Freunde <span class='text-sky-500 font-bold'>jede</span> Woche.",
      translation: "I meet my friends every week.",
    },
    {
      audioUrl: "https://www.w3schools.com/html/horse.mp3",
      text: "Ich treffe meine Freunde <span class='text-sky-500 font-bold'>jedes</span> Wochenende.",
      translation: "I meet my friends every weekend.",
    },
  ],
};

const meta: Meta<typeof TheoryQuestionCard> = {
  title: "Quiz/TheoryQuestionCard",
  component: TheoryQuestionCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    question: sampleTheoryQuestion,
  },
};

export default meta;
type Story = StoryObj<typeof TheoryQuestionCard>;

export const Default: Story = {};

export const TextOnly: Story = {
  args: {
    question: {
      ...sampleTheoryQuestion,
      media: undefined,
      audioSamples: undefined,
    },
  },
};

export const WithVideo: Story = {
  args: {
    question: {
      ...sampleTheoryQuestion,
      media: [
        {
          kind: "video",
          url: "https://www.youtube.com/watch?v=0lStodgghOc",
          caption: "Explanation Video",
        },
      ],
    },
  },
};

export const MultipleMedia: Story = {
  args: {
    question: {
      ...sampleTheoryQuestion,
      media: [
        {
          kind: "image",
          url: "https://picsum.photos/seed/1/800/400",
          caption: "Image 1",
        },
        {
          kind: "image",
          url: "https://picsum.photos/seed/2/800/400",
          caption: "Image 2",
        },
      ],
    },
  },
};

export const InterleavedBlocks: Story = {
  args: {
    question: {
      id: "theory-blocks",
      title: "Storytelling Mode",
      content: "", // Ignored when blocks are present
      blocks: [
        {
          kind: "text",
          html: "<p>This is the first paragraph. We start by introducing the concept of <b>Articles</b>.</p>",
        },
        {
          kind: "image",
          url: "https://picsum.photos/800/400",
          caption: "Visual Aid 1",
        },
        {
          kind: "text",
          html: "<p>Now that you've seen the image, let's listen to how it sounds in a sentence:</p>",
        },
        {
          kind: "audio",
          samples: [
            {
              audioUrl: "https://www.w3schools.com/html/horse.mp3",
              text: "Das ist <b>ein</b> Haus.",
              translation: "That is a house.",
            },
          ],
        },
        {
          kind: "text",
          html: "<p>Finally, here is a video explaining the grammar rules in detail.</p>",
        },
        {
          kind: "video",
          url: "https://www.youtube.com/watch?v=0lStodgghOc",
          caption: "Grammar Explanation",
        },
      ],
    },
  },
};

export const ComplexArticle: Story = {
  args: {
    question: {
      id: "theory-complex",
      title: "German Articles & Cases",
      content: "",
      blocks: [
        {
          kind: "image",
          url: "https://picsum.photos/800/400?grayscale",
          caption: "Introduction: The Structure of German",
        },
        {
          kind: "text",
          html: "<p>Welcome to our deep dive into German articles. Unlike English, which only has 'the' and 'a', German has many forms depending on the <b>gender</b> and <b>case</b>.</p>",
        },
        {
          kind: "audio",
          samples: [
            {
              audioUrl: "https://www.w3schools.com/html/horse.mp3",
              text: "Der Mann (Nominativ)",
              translation: "The man (Subject)",
            },
            {
              audioUrl: "https://www.w3schools.com/html/horse.mp3",
              text: "Den Mann (Akkusativ)",
              translation: "The man (Object)",
            },
          ],
        },
        {
          kind: "text",
          html: "<p>Notice how 'Der' changes to 'Den'? That is the accusative case in action. It happens when the man is the object of the sentence.</p><p>Now, let's watch a short explanation to visualize this change:</p>",
        },
        {
          kind: "video",
          url: "https://www.youtube.com/watch?v=0lStodgghOc",
          caption: "Visualizing the Accusative Case",
        },
        {
          kind: "text",
          html: "<p>Great! Now that you've watched the video, try to listen to this final example where we use the Dative case.</p>",
        },
        {
          kind: "audio",
          samples: [
            {
              audioUrl: "https://www.w3schools.com/html/horse.mp3",
              text: "Ich gebe <b>dem</b> Mann ein Buch.",
              translation: "I give the man a book.",
            },
          ],
        },
      ],
    },
  },
};
