// app/questionsTree/page.tsx
"use client"
import { useSearchParams } from "next/navigation"; // Using Next.js built-in hook for query params
import QuestionModal from "../_components/question-modal";

export default function QuestionsTree() {
    const searchParams = useSearchParams();
    const questions = searchParams.get("questions");
    
    const parsedQuestions: [] = questions
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
