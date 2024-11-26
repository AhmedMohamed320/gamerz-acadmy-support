// app/questionsTree/page.tsx
"use client"
import { useSearchParams } from "next/navigation"; // Using Next.js built-in hook for query params
import QuestionModal from "../_components/question-modal";
import { QuestionNode } from "../page"; // Reuse type from the Home page

export default function QuestionsTree() {
    const searchParams = useSearchParams();
    const questions = searchParams.get("questions");
    
    const parsedQuestions: QuestionNode[] = questions
        ? JSON.parse(questions)
        : [];

    return (
        <main>
            <div>
                {parsedQuestions.map((question) => (
                    <QuestionModal key={question.id} question={question} />
                ))}
            </div>
        </main>
    );
}
