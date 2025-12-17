export type Locale = "en" | "id";

export type Dictionary = {
  common: {
    loading: string;
    save: string;
    cancel: string;
    back: string;
  };
  settings: {
    title: string;
    language: string;
    darkMode: string;
    theme: string;
    languageDescription: string;
  };
  sidebar: {
    path: string;
    learn: string;
    practice: string;
    leaderboard: string;
    quests: string;
    shop: string;
    profile: string;
    more: string;
    settings: string;
    logout: string;
  };
};
