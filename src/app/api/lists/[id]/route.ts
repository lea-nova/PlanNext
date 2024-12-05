import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const response = await prisma.list.findUnique({
        where: { id: id }
    });
    if (response?.id) {
        const tasksOfOneList = await prisma.task.findMany({
            where: { listId: response.id }
        })
        if (!tasksOfOneList) {
            console.log("Erreur tâches non trouvée");
        }
    }
    return NextResponse.json(response);

}

export async function PUT() {


}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    const listId = parseInt(params.id, 10);

    const deletingById = await prisma.list.findUnique({
        where: { id: listId }
    })

    if (deletingById) {
        await prisma.list.delete({
            where: { id: listId }
        })
    }

    return NextResponse.json("La liste a bien été supprimé.");
}