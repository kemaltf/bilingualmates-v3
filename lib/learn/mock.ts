import type { CurriculumPath } from "./types"

export const paths: CurriculumPath[] = [
  {
    id: "general",
    name: "General English",
    emoji: "📘",
    color: "emerald",
    imageUrl: "/images/path-general.svg",
    units: [
      {
        id: "u1",
        title: "Unit 1: Basics",
        sequence: 1,
        badge: { status: "in_progress", title: "Unit Badge" },
        nodes: [
          { id: "n1", title: "Greetings", description: "Basic hello/bye phrases", status: "completed", xpReward: 10, durationSec: 80 },
          { id: "n2", title: "Alphabet", description: "Pronouncing letters A–Z", status: "in_progress", xpReward: 10, durationSec: 90 },
          { id: "n3", title: "Numbers", description: "Counting from 1 to 100", status: "locked", xpReward: 10, durationSec: 85 },
        ],
      },
      {
        id: "u2",
        title: "Unit 2: Daily Life",
        sequence: 2,
        badge: { status: "locked", title: "Unit Badge" },
        nodes: [
          { id: "n4", title: "Routine", description: "Describe daily activities", status: "locked", xpReward: 10, durationSec: 95 },
          { id: "n5", title: "Shopping", description: "Buying items and asking prices", status: "locked", xpReward: 10, durationSec: 88 },
          { id: "n6", title: "Food", description: "Common food vocabulary", status: "locked", xpReward: 10, durationSec: 92 },
        ],
      },
      {
        id: "u3",
        title: "Unit 3: Travel",
        sequence: 3,
        badge: { status: "locked", title: "Unit Badge" },
        nodes: [
          { id: "n7", title: "Airport", description: "Check-in and boarding", status: "locked", xpReward: 10, durationSec: 100 },
          { id: "n8", title: "Hotel", description: "Reservations and requests", status: "locked", xpReward: 10, durationSec: 97 },
          { id: "n9", title: "Directions", description: "Asking and giving directions", status: "locked", xpReward: 10, durationSec: 104 },
        ],
      },
    ],
  },
  {
    id: "business",
    name: "Business English",
    emoji: "💼",
    color: "sky",
    imageUrl: "/images/path-business.svg",
    units: [
      {
        id: "bu1",
        title: "Unit 1: Emails",
        sequence: 1,
        badge: { status: "in_progress", title: "Unit Badge" },
        nodes: [
          { id: "bn1", title: "Greetings", description: "Formal vs casual greetings", status: "completed", xpReward: 10, durationSec: 80 },
          { id: "bn2", title: "Subject Lines", description: "Clear and effective subjects", status: "in_progress", xpReward: 10, durationSec: 90 },
          { id: "bn3", title: "Closings", description: "Professional email endings", status: "locked", xpReward: 10, durationSec: 85 },
        ],
      },
      {
        id: "bu2",
        title: "Unit 2: Meetings",
        sequence: 2,
        badge: { status: "locked", title: "Unit Badge" },
        nodes: [
          { id: "bn4", title: "Agenda", description: "Setting meeting goals", status: "locked", xpReward: 10, durationSec: 95 },
          { id: "bn5", title: "Decision", description: "Recording decisions", status: "locked", xpReward: 10, durationSec: 88 },
          { id: "bn6", title: "Follow-up", description: "Next steps and action items", status: "locked", xpReward: 10, durationSec: 92 },
        ],
      },
    ],
  },
  {
    id: "kids",
    name: "Kids English",
    emoji: "🧸",
    color: "amber",
    imageUrl: "/images/path-kids.svg",
    units: [
      {
        id: "k1",
        title: "Unit 1: Fun Basics",
        sequence: 1,
        badge: { status: "locked", title: "Unit Badge" },
        nodes: [
          { id: "kn1", title: "Colors", description: "Learn basic colors", status: "locked", xpReward: 10, durationSec: 60 },
          { id: "kn2", title: "Animals", description: "Common animals", status: "locked", xpReward: 10, durationSec: 70 },
          { id: "kn3", title: "Fruits", description: "Favorite fruits", status: "locked", xpReward: 10, durationSec: 65 },
        ],
      },
    ],
  },
  {
    id: "travel2",
    name: "Travel English",
    emoji: "✈️",
    color: "indigo",
    imageUrl: "/images/path-travel.svg",
    units: [
      {
        id: "t1",
        title: "Unit 1: Basics",
        sequence: 1,
        badge: { status: "in_progress", title: "Unit Badge" },
        nodes: [
          { id: "tn1", title: "Tickets", description: "Buying tickets", status: "in_progress", xpReward: 10, durationSec: 80 },
          { id: "tn2", title: "Boarding", description: "Boarding steps", status: "locked", xpReward: 10, durationSec: 90 },
          { id: "tn3", title: "Customs", description: "Customs questions", status: "locked", xpReward: 10, durationSec: 85 },
        ],
      },
    ],
  },
]