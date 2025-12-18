import {
  Monitor,
  Newspaper,
  Users,
  Search,
  MessageCircle,
  Globe,
  Plane,
  Briefcase,
  GraduationCap,
  Gamepad,
  Brain,
} from "lucide-react";

export const LANGUAGES = [
  { id: "en", name: "English", flag: "/flags/en.svg" },
  { id: "id", name: "Indonesian", flag: "/flags/id.svg" },
  { id: "de", name: "German", flag: "/flags/de.svg" },
  { id: "es", name: "Spanish", flag: "/flags/es.svg" },
  { id: "fr", name: "French", flag: "/flags/fr.svg" },
  { id: "ja", name: "Japanese", flag: "/flags/jp.svg" },
];

export const SOURCES = [
  { id: "youtube", icon: Monitor },
  { id: "news", icon: Newspaper },
  { id: "friends", icon: Users },
  { id: "google", icon: Search },
  { id: "social", icon: MessageCircle },
  { id: "tv", icon: Monitor },
  { id: "other", icon: Globe },
];

export const GOALS = [
  { id: "travel", icon: Plane },
  { id: "career", icon: Briefcase },
  { id: "school", icon: GraduationCap },
  { id: "fun", icon: Gamepad },
  { id: "brain", icon: Brain },
  { id: "connect", icon: Users },
  { id: "other", icon: Globe },
];

export const LEVELS = [
  { id: "new" },
  { id: "beginner" },
  { id: "intermediate" },
  { id: "advanced" },
];

export const PATHS = [
  { id: "basics", icon: Globe },
  { id: "travel", icon: Plane },
  { id: "business", icon: Briefcase },
  { id: "academic", icon: GraduationCap },
];
