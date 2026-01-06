
export interface Character {
  name: string;
  role: string;
  description: string;
  symbolism?: string;
}

export interface ChapterSummary {
  chapter: number;
  title: string;
  summary: string;
  keyEvents: string[];
}

export interface Theme {
  title: string;
  description: string;
  examples: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export enum AppSection {
  OVERVIEW = 'overview',
  CHAPTERS = 'chapters',
  CHARACTERS = 'characters',
  THEMES = 'themes',
  RULES = 'rules',
  QUIZ = 'quiz',
  CHAT = 'chat'
}
