export type LessonType = "theory" | "video" | "exercise" | "quiz";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export type BlockVariant = "info" | "warning" | "tip" | "danger";

export interface LessonBlock {
  type: "heading" | "paragraph" | "list" | "code" | "callout";
  text?: string;
  items?: string[];
  code?: string;
  variant?: BlockVariant;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  blocks: LessonBlock[];
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  levelId: number;
  title: string;
  description: string;
  modules: Module[];
  xp: number;
}
