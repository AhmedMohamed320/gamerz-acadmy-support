import React from "react";
import QuestionModal from "../question-modal";
import { Page, Question } from "@prisma/client";

type Props = { questions: Question[]; pages: Page[] };

const QuestionsTab = ({ questions, pages }: Props) => {
  return (
    <div>
      <QuestionModal pages={pages} />
      <div className="mt-5 flex flex-wrap gap-5">
        {questions.map((question) => (
          <QuestionModal key={question.id} question_={question} pages={pages} />
        ))}
      </div>
    </div>
  );
};

export default QuestionsTab;
