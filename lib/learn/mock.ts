import type { Course, CurriculumPath, Unit } from "./types";

const commonUnits: Unit[] = [
  {
    id: "u1",
    title: "Unit 1: Basics",
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
    units: [
      {
        id: "u1",
        title: "Unit 1: Basics",
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
            description: "Pronouncing letters A–Z",
            status: "in_progress",
            xpReward: 10,
            durationSec: 90,
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
          },
        ],
      },
      {
        id: "u2",
        title: "Unit 2: Daily Life",
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
    units: [
      {
        id: "bu1",
        title: "Unit 1: Emails",
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
    units: [
      {
        id: "t1",
        title: "Unit 1: Basics",
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
  units: commonUnits,
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
