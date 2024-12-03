// import prisma from "@/app/lib/prisma";
// import { NextResponse } from "next/server";


// export async function GET(req: Request, { params }: { params: { listId: string } }) {
//     const { listId } = params;


//     // Récupérer toutes les tâches associées à un listId donné
//     const tasks = await prisma.task.findMany({
//         where: {
//             listId: parseInt(listId), // Convertir listId en entier si c'est un string
//         },
//     });

//     // Retourner les tâches sous forme de réponse JSON
//     return NextResponse.json(tasks);

// }