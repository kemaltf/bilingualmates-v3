import type { Course, CurriculumPath, Unit } from "./types";

const commonUnits: Unit[] = [
  {
    id: "u1",
    title: "Unit 1: Basics",
    description: "Learn basic greetings and numbers.",
    sequence: 1,
    brandColor: "emerald",
    badge: { status: "in_progress", title: "Unit Badge" },
    nodes: [
      {
        id: "n1",
        title: "Greetings",
        description: "Basic hello/bye phrases",
        status: "completed",
        xpReward: 10,
        durationSec: 80,
      },
      {
        id: "n2",
        title: "Alphabet",
        description: "Pronouncing letters",
        status: "in_progress",
        xpReward: 10,
        durationSec: 90,
      },
      {
        id: "n3",
        title: "Numbers",
        description: "Counting from 1 to 10",
        status: "locked",
        xpReward: 10,
        durationSec: 85,
      },
    ],
  },
];

// Paths for English Course
const englishPaths: CurriculumPath[] = [
  {
    id: "general",
    course: "General English",
    emoji: "📘",
    color: "emerald",
    imageUrl: "/images/path-general.svg",
    price: 0,
    currency: "IDR",
    description: "Just starting and want to be consistent without pressure.",
    sections: [
      {
        id: "sec1",
        title: "Section 1: Foundations",
        description: "Build a strong base for your English journey.",
        sequence: 1,
        units: [
          {
            id: "u1",
            title: "Unit 1: Basics",
            description: "Learn the fundamentals of English grammar.",
            sequence: 1,
            brandColor: "emerald",
            badge: { status: "in_progress", title: "Unit Badge" },
            nodes: [
              {
                id: "n1",
                title: "Greetings",
                description: "Basic hello/bye phrases",
                status: "completed",
                xpReward: 10,
                durationSec: 80,
                quizQuestions: [
                  {
                    kind: "theory",
                    id: "n1-theory-1",
                    title: "Formal vs Informal",
                    content: `
                      <p>In English, choosing the right greeting depends on who you are talking to.</p>
                      <div class="grid grid-cols-2 gap-4 my-4">
                        <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                          <h3 class="font-bold text-emerald-600 dark:text-emerald-400">Formal</h3>
                          <p>Used with strangers, elders, or in business.</p>
                          <ul class="list-disc list-inside mt-2 text-sm">
                            <li>Hello</li>
                            <li>Good morning</li>
                            <li>How do you do?</li>
                          </ul>
                        </div>
                        <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                          <h3 class="font-bold text-indigo-600 dark:text-indigo-400">Informal</h3>
                          <p>Used with friends and family.</p>
                          <ul class="list-disc list-inside mt-2 text-sm">
                            <li>Hi</li>
                            <li>Hey</li>
                            <li>What's up?</li>
                          </ul>
                        </div>
                      </div>
                    `,
                    buttonLabel: "Let's Practice",
                    audioSamples: [
                      {
                        text: "Hello, good morning.",
                        translation: "Halo, selamat pagi (Formal)",
                        audioUrl: "/audio/hello_formal.mp3",
                      },
                      {
                        text: "Hey, what's up?",
                        translation: "Hei, apa kabar? (Informal)",
                        audioUrl: "/audio/hey_informal.mp3",
                      },
                    ],
                  },
                  {
                    kind: "mcq",
                    id: "n1-mcq-1",
                    prompt: {
                      kind: "text",
                      text: "Which of these is a **formal** greeting?",
                    },
                    options: [
                      {
                        id: "opt1",
                        content: { kind: "text", text: "Hey there!" },
                      },
                      {
                        id: "opt2",
                        content: { kind: "text", text: "Good afternoon" },
                      },
                      {
                        id: "opt3",
                        content: { kind: "text", text: "What's up?" },
                      },
                      { id: "opt4", content: { kind: "text", text: "Yo!" } },
                    ],
                    correctOptionId: "opt2",
                  },
                  {
                    kind: "match",
                    id: "n1-match-1",
                    prompt: {
                      kind: "text",
                      text: "Match the greeting to the situation",
                    },
                    leftItems: [
                      {
                        id: "l1",
                        content: { kind: "text", text: "Good morning" },
                      },
                      {
                        id: "l2",
                        content: { kind: "text", text: "Good afternoon" },
                      },
                      {
                        id: "l3",
                        content: { kind: "text", text: "Good evening" },
                      },
                      {
                        id: "l4",
                        content: { kind: "text", text: "Good night" },
                      },
                    ],
                    rightItems: [
                      {
                        id: "r1",
                        content: { kind: "text", text: "Before 12 PM" },
                      },
                      {
                        id: "r2",
                        content: { kind: "text", text: "12 PM - 5 PM" },
                      },
                      {
                        id: "r3",
                        content: { kind: "text", text: "After 5 PM" },
                      },
                      {
                        id: "r4",
                        content: { kind: "text", text: "Before sleeping" },
                      },
                    ],
                    correctPairs: [
                      { leftId: "l1", rightId: "r1" },
                      { leftId: "l2", rightId: "r2" },
                      { leftId: "l3", rightId: "r3" },
                      { leftId: "l4", rightId: "r4" },
                    ],
                  },
                  {
                    kind: "reorder",
                    id: "n1-reorder-1",
                    prompt: {
                      kind: "text",
                      text: "Arrange the words to form a polite greeting",
                    },
                    tokens: ["Hello", "how", "are", "you", "today?"],
                    correctOrder: ["Hello", "how", "are", "you", "today?"],
                  },
                  {
                    kind: "cloze",
                    id: "n1-cloze-1",
                    prompt: { kind: "text", text: "Complete the dialogue" },
                    segments: [
                      { kind: "text", text: "A: Hello, my name " },
                      {
                        kind: "blank",
                        blank: { id: "b1", options: ["is", "am"] },
                      },
                      { kind: "text", text: " John.\nB: Hi John, I " },
                      {
                        kind: "blank",
                        blank: { id: "b2", options: ["is", "am"] },
                      },
                      { kind: "text", text: " Sarah. Nice to " },
                      {
                        kind: "blank",
                        blank: { id: "b3", options: ["meet", "see"] },
                      },
                      { kind: "text", text: " you." },
                    ],
                    correctAnswers: { b1: "is", b2: "am", b3: "meet" },
                  },
                  {
                    kind: "short_text",
                    id: "n1-st-1",
                    prompt: {
                      kind: "text",
                      text: "Translate 'Selamat pagi' to English",
                    },
                    correctAnswers: ["Good morning", "Morning"],
                    placeholder: "Type your answer...",
                  },
                ],
              },
              {
                id: "n2",
                title: "Alphabet",
                description: "Pronouncing letters A–Z",
                status: "in_progress",
                xpReward: 10,
                durationSec: 90,
                quizQuestions: [
                  {
                    kind: "theory",
                    id: "n2-theory-1",
                    title: "The Alphabet",
                    content:
                      "<p>English has 26 letters. 5 vowels (A, E, I, O, U) and 21 consonants.</p>",
                    buttonLabel: "Start Quiz",
                  },
                  {
                    kind: "match",
                    id: "n2-match-1",
                    prompt: {
                      kind: "text",
                      text: "Match uppercase and lowercase",
                    },
                    leftItems: [
                      { id: "l1", content: { kind: "text", text: "A" } },
                      { id: "l2", content: { kind: "text", text: "B" } },
                      { id: "l3", content: { kind: "text", text: "D" } },
                      { id: "l4", content: { kind: "text", text: "E" } },
                    ],
                    rightItems: [
                      { id: "r1", content: { kind: "text", text: "a" } },
                      { id: "r2", content: { kind: "text", text: "b" } },
                      { id: "r3", content: { kind: "text", text: "d" } },
                      { id: "r4", content: { kind: "text", text: "e" } },
                    ],
                    correctPairs: [
                      { leftId: "l1", rightId: "r1" },
                      { leftId: "l2", rightId: "r2" },
                      { leftId: "l3", rightId: "r3" },
                      { leftId: "l4", rightId: "r4" },
                    ],
                  },
                ],
              },
              {
                id: "ad-u1-1",
                title: "ADS",
                status: "in_progress",
                xpReward: 0,
                durationSec: 30,
                kind: "ad",
                ad: {
                  id: "ad-yt-001",
                  provider: "YouTube",
                  mediaUrl: "https://youtu.be/dQw4w9WgXcQ",
                },
              },
              {
                id: "n3",
                title: "Numbers",
                description: "Counting from 1 to 100",
                status: "locked",
                xpReward: 10,
                durationSec: 85,
                quizQuestions: [
                  {
                    kind: "short_text",
                    id: "n3-st-1",
                    prompt: {
                      kind: "text",
                      text: "Write the number 12 in words",
                    },
                    correctAnswers: ["twelve"],
                    placeholder: "e.g. one, two...",
                  },
                  {
                    kind: "reorder",
                    id: "n3-reorder-1",
                    prompt: {
                      kind: "text",
                      text: "Order from smallest to largest",
                    },
                    tokens: ["One", "Two", "Three", "Four", "Five"],
                    correctOrder: ["One", "Two", "Three", "Four", "Five"],
                  },
                ],
              },
            ],
          },
          {
            id: "u2",
            title: "Unit 2: Daily Life",
            description: "Talk about your daily routine and activities.",
            sequence: 2,
            brandColor: "sky",
            badge: { status: "locked", title: "Unit Badge" },
            nodes: [
              {
                id: "n4",
                title: "Routine",
                description: "Describe daily activities",
                status: "locked",
                xpReward: 10,
                durationSec: 95,
                quizQuestions: [
                  {
                    kind: "cloze",
                    id: "n4-cloze-1",
                    prompt: {
                      kind: "text",
                      text: "Fill in the morning routine",
                    },
                    segments: [
                      { kind: "text", text: "I " },
                      {
                        kind: "blank",
                        blank: { id: "b1", options: ["wake", "stand"] },
                      },
                      { kind: "text", text: " up at 6 AM. Then I " },
                      {
                        kind: "blank",
                        blank: { id: "b2", options: ["brush", "wash"] },
                      },
                      { kind: "text", text: " my teeth and " },
                      {
                        kind: "blank",
                        blank: { id: "b3", options: ["eat", "drink"] },
                      },
                      { kind: "text", text: " breakfast." },
                    ],
                    correctAnswers: { b1: "wake", b2: "brush", b3: "eat" },
                  },
                ],
              },
              {
                id: "n5",
                title: "Shopping",
                description: "Buying items and asking prices",
                status: "locked",
                xpReward: 10,
                durationSec: 88,
              },
              {
                id: "n6",
                title: "Food",
                description: "Common food vocabulary",
                status: "locked",
                xpReward: 10,
                durationSec: 92,
              },
            ],
          },
        ],
      },
      {
        id: "sec2",
        title: "Section 2: Basic Conversation",
        description: "Start having real conversations.",
        sequence: 2,
        units: [
          {
            id: "u3",
            title: "Unit 3: Introductions",
            description: "Introduce yourself and others.",
            sequence: 1,
            brandColor: "indigo",
            badge: { status: "locked", title: "Unit Badge" },
            nodes: [
              {
                id: "n7",
                title: "My Name Is",
                description: "Saying your name",
                status: "locked",
                xpReward: 10,
                durationSec: 80,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "business",
    course: "Business English",
    emoji: "💼",
    color: "sky",
    imageUrl: "/images/path-business.svg",
    price: 150000,
    originalPrice: 299000,
    currency: "IDR",
    studentsCount: 3215,
    difficulty: "Advanced",
    estimatedTime: "8 Weeks",
    certificate: true,
    language: "English",
    description: "Master professional communication and advance your career.",
    learningPoints: [
      "Write professional emails and reports",
      "Conduct meetings and negotiations confidently",
      "Deliver impactful presentations",
      "Network with international colleagues",
    ],
    sections: [
      {
        id: "sec_bus1",
        title: "Section 1: Business Basics",
        description: "Introduction to professional environment.",
        sequence: 1,
        units: [
          {
            id: "bu1",
            title: "Unit 1: Emails",
            description: "Write effective and professional emails.",
            sequence: 1,
            brandColor: "indigo",
            badge: { status: "in_progress", title: "Unit Badge" },
            nodes: [
              {
                id: "bn1",
                title: "Greetings",
                description: "Formal vs casual greetings",
                status: "completed",
                xpReward: 10,
                durationSec: 80,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "travel",
    course: "Travel English",
    emoji: "✈️",
    color: "indigo",
    imageUrl: "/images/path-travel.svg",
    price: 120000,
    originalPrice: 249000,
    currency: "IDR",
    studentsCount: 843,
    difficulty: "Intermediate",
    estimatedTime: "4 Weeks",
    certificate: false,
    language: "English",
    description: "Want to speak confidently when traveling or going abroad.",
    learningPoints: [
      "Navigate airports and hotels with ease",
      "Order food and ask for recommendations",
      "Handle emergencies and health issues",
      "Make small talk with locals",
    ],
    sections: [
      {
        id: "sec_trav1",
        title: "Section 1: Travel Essentials",
        description: "Everything you need for your trip.",
        sequence: 1,
        units: [
          {
            id: "t1",
            title: "Unit 1: Basics",
            description: "Essential phrases for travelers.",
            sequence: 1,
            brandColor: "sky",
            badge: { status: "in_progress", title: "Unit Badge" },
            nodes: [
              {
                id: "tn1",
                title: "Tickets",
                description: "Buying tickets",
                status: "in_progress",
                xpReward: 10,
                durationSec: 80,
              },
            ],
          },
        ],
      },
    ],
  },
];

// Default path for other languages
const defaultPath = (courseName: string): CurriculumPath => ({
  id: "general",
  course: `General ${courseName}`,
  emoji: "📘",
  color: "emerald",
  price: 0,
  currency: "IDR",
  description: `Start learning ${courseName} from basics.`,
  sections: [
    {
      id: "sec_def",
      title: "Section 1: Start Here",
      description: "Begin your journey.",
      sequence: 1,
      units: commonUnits,
    },
  ],
});

export const courses: Course[] = [
  {
    id: "en",
    title: "Bahasa Inggris",
    flagUrl: "/flags/en.svg",
    description: "Kursus bahasa Inggris lengkap untuk pemula hingga mahir.",
    paths: englishPaths,
  },
  {
    id: "id",
    title: "Bahasa Indonesia",
    flagUrl: "/flags/id.svg",
    description: "Pelajari Hiragana, Katakana, dan Kanji dasar.",
    paths: [defaultPath("Indonesian")],
  },
];

export const paths: CurriculumPath[] = englishPaths;
