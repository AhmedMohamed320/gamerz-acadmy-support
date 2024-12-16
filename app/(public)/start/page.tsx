"use client"; // لضمان أن الكود يعمل فقط على العميل

import { useEffect, useState } from "react";
import { QuestionNode } from "../../types";
import QuestionModal from "../_components/question-modal";

export default function QuestionsTree() {
    const [questions, setQuestions] = useState<QuestionNode[]>([]);

    useEffect(() => {
        const storedQuestions = localStorage.getItem("questions");
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        }
    }, []);

    return (
        <main>
            <div>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <QuestionModal key={question.id} question={question} />
                    ))
                ) : (
                    <p>لا توجد أسئلة حالياً.</p>
                )}
            </div>
        </main>
    );
}
