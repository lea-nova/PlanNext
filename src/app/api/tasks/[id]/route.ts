import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(
    request: Request,
    props: { params: Promise<{ id: string, listId: string }> }
) {
    const params = await props.params;
    const id = parseInt(params.id, 10);
    const response = await prisma.task.findMany({
        where: { id }
    });
    return NextResponse.json(response);
}

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//     const { id } = await params.id;
//     // const { id } = params;
//     // const id = await params.id
//     const bodyRequest = await request.json();

//     if (!id) {
//         return NextResponse.json({ error: 'ID Non fourni' })
//     }
//     const task = await prisma.task.findUnique({
//         where: {
//             id: bodyRequest.id,
//         }
//     })
//     const updatedTask = await prisma.task.update({
//         where: { id: task?.id },
//         data: { completed: !task?.completed },
//     });

//     return updatedTask;
// }


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);

    try {
        const body = await req.json();
        const { completed } = body;



        // Validation des données
        if (typeof completed !== 'boolean') {
            return NextResponse.json(
                { error: 'Le champ completed doit être un booléen.' },
                { status: 400 }
            );
        }

        // Mise à jour via Prisma
        const updatedTask = await prisma.task.update({
            where: { id: id },
            data: { completed: body.completed },
        });

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error('Erreur API:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour de la tâche.' },
            { status: 500 }
        );
    }
}
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

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

