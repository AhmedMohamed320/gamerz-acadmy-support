"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createQuestion = async (options: {
    data: Prisma.Without<
        Prisma.QuestionCreateInput,
        Prisma.QuestionUncheckedCreateInput
    > &
        Prisma.QuestionUncheckedCreateInput;
}) => {
    try {
        const question = await prisma.question.create(options);
        revalidatePath("/admin");
        revalidatePath("/");
        return question;
    } catch (error) {
        console.error(error);
        revalidatePath("/admin");
        revalidatePath("/");
    }
};

export const updateQuestion = async (options: {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.Without<
        Prisma.QuestionUpdateInput,
        Prisma.QuestionUncheckedUpdateInput
    > &
        Prisma.QuestionUncheckedUpdateInput;
}) => {
    try {
        const question = await prisma.question.update(options);
        revalidatePath("/admin");
        revalidatePath("/");

        return question;
    } catch (error) {
        console.error(error);
        revalidatePath("/admin");
        revalidatePath("/");
    }
};

export const deleteQuestion = async (options: {
    where: Prisma.QuestionWhereUniqueInput;
}) => {
    try {
        const question = await prisma.question.delete(options);
        revalidatePath("/admin");
        revalidatePath("/");

        return question;
    } catch (error) {
        console.error(error);
        revalidatePath("/admin");
        revalidatePath("/");
    }
};

export const searchQuestions = async (options: {
    where: Prisma.QuestionWhereInput;
}) => {
    try {
        const questions = await prisma.question.findMany(options);
        return questions;
    } catch (error) {
        console.error(error);
    }
};
