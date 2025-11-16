import type { Topic, VideoItem, ContinueWatchingItem, ChapterItem } from "./types"

export const topics: Topic[] = [
  { id: "greetings", name: "Greetings", icon: "👋" },
  { id: "travel", name: "Travel", icon: "✈️" },
  { id: "daily_life", name: "Daily Life", icon: "🏠" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "slang", name: "Slang", icon: "😎" },
  { id: "grammar_tips", name: "Grammar Tips", icon: "📚" },
  { id: "culture", name: "Culture", icon: "🌍" },
]

export const videos: VideoItem[] = [
  {
    id: "v1",
    title: "Greetings in English",
    durationSec: 83,
    thumbnailUrl: "https://picsum.photos/seed/greet/640/360",
    xpReward: 5,
    difficulty: "beginner",
    topicId: "greetings",
  },
  {
    id: "v2",
    title: "Travel Phrases",
    durationSec: 96,
    thumbnailUrl: "https://picsum.photos/seed/travel/640/360",
    xpReward: 7,
    difficulty: "intermediate",
    topicId: "travel",
  },
  {
    id: "v3",
    title: "Daily Conversation Tips",
    durationSec: 72,
    thumbnailUrl: "https://picsum.photos/seed/daily/640/360",
    xpReward: 6,
    difficulty: "beginner",
    topicId: "daily_life",
  },
  {
    id: "v4",
    title: "Business Email Etiquette",
    durationSec: 110,
    thumbnailUrl: "https://picsum.photos/seed/business/640/360",
    xpReward: 8,
    difficulty: "advanced",
    topicId: "business",
  },
  {
    id: "v5",
    title: "Modern Slang Essentials",
    durationSec: 64,
    thumbnailUrl: "https://picsum.photos/seed/slang/640/360",
    xpReward: 5,
    difficulty: "intermediate",
    topicId: "slang",
  },
  {
    id: "v6",
    title: "Grammar: Present Continuous",
    durationSec: 95,
    thumbnailUrl: "https://picsum.photos/seed/grammar/640/360",
    xpReward: 7,
    difficulty: "beginner",
    topicId: "grammar_tips",
  },
  {
    id: "v7",
    title: "Cultural Gestures",
    durationSec: 87,
    thumbnailUrl: "https://picsum.photos/seed/culture/640/360",
    xpReward: 6,
    difficulty: "intermediate",
    topicId: "culture",
  },
]

export const continueWatching: ContinueWatchingItem[] = [
  { ...videos[0], progressPercent: 40 },
  { ...videos[2], progressPercent: 65 },
  { ...videos[5], progressPercent: 25 },
]

export const chaptersByTopic: Record<string, ChapterItem[]> = {
  greetings: [
    { ...videos[0], id: "c-g-1", title: "Hello and Bye", sequence: 1, status: "completed", progressPercent: 100 },
    { ...videos[0], id: "c-g-2", title: "Polite Greetings", sequence: 2, status: "in_progress", progressPercent: 45 },
    { ...videos[0], id: "c-g-3", title: "Introducing Yourself", sequence: 3, status: "locked" },
  ],
  travel: [
    { ...videos[1], id: "c-t-1", title: "At the Airport", sequence: 1, status: "completed", progressPercent: 100 },
    { ...videos[1], id: "c-t-2", title: "On the Train", sequence: 2, status: "in_progress", progressPercent: 30 },
    { ...videos[1], id: "c-t-3", title: "Hotel Check-in", sequence: 3, status: "locked" },
  ],
  daily_life: [
    { ...videos[2], id: "c-d-1", title: "Morning Routine", sequence: 1, status: "completed", progressPercent: 100 },
    { ...videos[2], id: "c-d-2", title: "Shopping", sequence: 2, status: "in_progress", progressPercent: 60 },
    { ...videos[2], id: "c-d-3", title: "Cooking", sequence: 3, status: "locked" },
  ],
  business: [
    { ...videos[3], id: "c-b-1", title: "Email Basics", sequence: 1, status: "completed", progressPercent: 100 },
    { ...videos[3], id: "c-b-2", title: "Meeting Phrases", sequence: 2, status: "in_progress", progressPercent: 25 },
    { ...videos[3], id: "c-b-3", title: "Negotiations", sequence: 3, status: "locked" },
  ],
  slang: [
    { ...videos[4], id: "c-s-1", title: "Internet Slang", sequence: 1, status: "completed", progressPercent: 100 },
    { ...videos[4], id: "c-s-2", title: "Casual Phrases", sequence: 2, status: "in_progress", progressPercent: 40 },
    { ...videos[4], id: "c-s-3", title: "Regional Slang", sequence: 3, status: "locked" },
  ],
  grammar_tips: [
    { ...videos[5], id: "c-gm-1", title: "Verb Tenses", sequence: 1, status: "completed", progressPercent: 100 },
    { ...videos[5], id: "c-gm-2", title: "Prepositions", sequence: 2, status: "in_progress", progressPercent: 55 },
    { ...videos[5], id: "c-gm-3", title: "Articles", sequence: 3, status: "locked" },
  ],
  culture: [
    { ...videos[6], id: "c-c-1", title: "Greetings & Gestures", sequence: 1, status: "completed", progressPercent: 100 },
    { ...videos[6], id: "c-c-2", title: "Dining Etiquette", sequence: 2, status: "in_progress", progressPercent: 35 },
    { ...videos[6], id: "c-c-3", title: "Festivals", sequence: 3, status: "locked" },
  ],
}