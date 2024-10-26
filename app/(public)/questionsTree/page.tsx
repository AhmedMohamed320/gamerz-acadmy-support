import prisma from "@/lib/prisma";
import QuestionModal from "../_components/question-modal";

export const revalidate = 0;
interface AnswerItem {
    id: string;
    type: "text" | "img" | "link";
    value: string;
    pageId?: string;
}

interface QuestionNode {
    id: string;
    title: string;
    answer?: AnswerItem[];
    children?: QuestionNode[];
    createdAt: Date;
    updatedAt: Date;
}

export default async function Page() {
    const questions = await prisma.question.findMany();
    const formattedQuestions = questions.map((question) => ({
        ...question,
        answer: question.answer as unknown as AnswerItem[],
        children: (question.children as unknown as QuestionNode[]) || [],
    }));

    return (
        <main>
            <div>
                {formattedQuestions.map((question) => (
                    <QuestionModal key={question.id} question={question} />
                ))}
            </div>
        </main>
    );
}
