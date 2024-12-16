import { NextPage } from "next";
import prisma from "@/lib/prisma";
import QuestionModal from "./_components/question-modal";
import Tabs from "./_components/tabs";

type DashboardPageProps = {};

const DashboardPage: NextPage = async ({}: DashboardPageProps) => {
  const questions = await prisma.question.findMany();
  const pages = await prisma.page.findMany();
  return (
    <div>
      <Tabs questions={questions} pages={pages} />
    </div>
  );
};

export default DashboardPage;
