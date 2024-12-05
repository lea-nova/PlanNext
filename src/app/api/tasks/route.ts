import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await prisma.task.findMany();
    return NextResponse.json(response);

}


export async function POST(request: Request) {
    const bodyReq = await request.json();
    const newList = await prisma.task.create({
        data: {
            listId: bodyReq.listId,
            content: bodyReq.content
        }
    })
    return NextResponse.json(newList);
}
