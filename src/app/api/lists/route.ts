import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    const response = await prisma.list.findMany();
    return NextResponse.json(response);

}

export async function POST(request: Request) {
    const bodyReq = await request.json();
    const newList = await prisma.list.create({
        data: {
            title: bodyReq.title
        }
    })
    return NextResponse.json(newList);
}
