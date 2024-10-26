import { ReactEditor } from "slate-react";
import { BaseEditor, Descendant } from "slate";

interface AnswerItem {
  id: string;
  type: "text" | "image" | "link";
  value: string;
  pageId?: string;
}

interface Answer {
  items: AnswerItem[];
}

interface Child {
  id: string;
  label: string;
  answer: Answer;
  children: Child[];
}
