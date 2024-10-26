"use client";

import PagesTab from "./pages-tab";
import { Page, Question } from "@prisma/client";
import { Tabs as Tabs_, Tab } from "@nextui-org/tabs";

import QuestionsTab from "./questions-tab";

interface TabsProps {
  questions: Question[];
  pages: Page[];
}
export default function Tabs({ questions, pages }: TabsProps) {
  return (
    <div className="flex w-full flex-col text-center items-center mt-44">
      <Tabs_ color="secondary" aria-label="Options">
        <Tab key="pages" title="صفحات الشرح">
          <PagesTab pages={pages} />
        </Tab>
        <Tab key="quesions" title="شجره الاسئله">
          <QuestionsTab questions={questions} pages={pages} />
        </Tab>
      </Tabs_>
    </div>
  );
}
