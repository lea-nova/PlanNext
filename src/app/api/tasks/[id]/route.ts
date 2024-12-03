import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(request: Request, { params }: { params: { id: string, listId: string } }) {
    const id = parseInt(params.id, 10);
    const response = await prisma.task.findMany({
        where: { id }
    });
    return NextResponse.json(response);

}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    // const { id } = params;
    const id = await params.id
    const bodyRequest = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'ID Non fourni' })
    }
    const updatedTask = await prisma.task.update({
        where: {
            id: parseInt(id)
        },
        data: { completed: bodyRequest.completed }
    })
    return NextResponse.json(updatedTask);

}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    const taskId = parseInt(params.id, 10);

    const deletingById = await prisma.task.findUnique({
        where: { id: taskId }
    })

    if (deletingById) {
        await prisma.task.delete({
            where: { id: taskId }
        })
    }

    return NextResponse.json("La tâche a bien été supprimé.");
}

