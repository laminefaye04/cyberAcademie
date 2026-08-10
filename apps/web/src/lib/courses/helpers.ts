import type { LessonBlock, BlockVariant } from "./types";

export const h = (text: string): LessonBlock => ({ type: "heading", text });

export const p = (text: string): LessonBlock => ({ type: "paragraph", text });

export const list = (...items: string[]): LessonBlock => ({ type: "list", items });

export const code = (code: string): LessonBlock => ({ type: "code", code });

export const callout = (
  text: string,
  variant: BlockVariant = "info"
): LessonBlock => ({ type: "callout", text, variant });
