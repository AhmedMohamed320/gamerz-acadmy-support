import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const question = await prisma.question.findMany();
  return NextResponse.json(question);
}
