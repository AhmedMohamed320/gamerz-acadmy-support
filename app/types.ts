
export interface AnswerItem {
    id: string;
    type: "text" | "img" | "link";
    value: string;
    pageId?: string;
}

export interface QuestionNode {
    id: string;
    title: string;
    answer?: AnswerItem[];
    children?: QuestionNode[];
    createdAt: Date;
    updatedAt: Date;
}
