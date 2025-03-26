import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const post = await prisma.post.create({
    data: { title, content },
  });
  return NextResponse.json(post);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Post deleted" });
}
