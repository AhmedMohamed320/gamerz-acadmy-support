"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createPage = async (options: {
  data: Prisma.Without<
    Prisma.PageCreateInput,
    Prisma.PageUncheckedCreateInput
  > &
    Prisma.PageUncheckedCreateInput;
}) => {
  try {
    const page = await prisma.page.create(options);
    revalidatePath("/admin");
    revalidatePath("/");
    return page;
  } catch (error) {
    console.error(error);
    revalidatePath("/admin");
    revalidatePath("/");
  }
};

export const updatePage = async (options: {
  where: Prisma.PageWhereUniqueInput;
  data: Prisma.PageUpdateInput;
}) => {
  try {
    const page = await prisma.page.update(options);
    revalidatePath("/admin");
    revalidatePath("/");
    return page;
  } catch (error) {
    console.error(error);
    revalidatePath("/admin");
    revalidatePath("/");
  }
};

export const deletePage = async (options: {
  where: Prisma.PageWhereUniqueInput;
}) => {
  try {
    const deletedPage = await prisma.page.delete(options);
    revalidatePath("/admin");
    revalidatePath("/");
    return deletedPage;
  } catch (error) {
    console.error("Error deleting page:", error);
    revalidatePath("/admin");
    revalidatePath("/");
  }
};
