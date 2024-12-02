'use server'
import prisma from "../lib/prisma";
import { ListType } from "@/types";


const fetchLists = async (): Promise<ListType[]> => {
    return prisma.list.findMany();
}
export default fetchLists;