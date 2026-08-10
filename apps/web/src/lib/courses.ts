import { COMPUTER_FUNDAMENTALS_COURSE } from "./courses/level-0";
import { LINUX_FUNDAMENTALS_COURSE } from "./courses/level-1";
import { NETWORKING_COURSE } from "./courses/level-2";
import { PYTHON_BASH_COURSE } from "./courses/level-3";
import { WEB_SECURITY_COURSE } from "./courses/level-4";
import { OWASP_TOP_10_COURSE } from "./courses/level-5";
import { PENTESTING_METHODOLOGY_COURSE } from "./courses/level-6";
import { CTF_TRAINING_COURSE } from "./courses/level-7";
import type {
  BlockVariant,
  Course,
  Lesson,
  LessonBlock,
  LessonType,
  Module,
  QuizQuestion,
} from "./courses/types";

export type {
  BlockVariant,
  Course,
  Lesson,
  LessonBlock,
  LessonType,
  Module,
  QuizQuestion,
};

export const COURSES: Course[] = [
  COMPUTER_FUNDAMENTALS_COURSE,
  LINUX_FUNDAMENTALS_COURSE,
  NETWORKING_COURSE,
  PYTHON_BASH_COURSE,
  WEB_SECURITY_COURSE,
  OWASP_TOP_10_COURSE,
  PENTESTING_METHODOLOGY_COURSE,
  CTF_TRAINING_COURSE,
];

export function getCourse(levelId: number): Course | undefined {
  return COURSES.find((course) => course.levelId === levelId);
}
