'use client'
import { TaskContextProvider } from "@/context/task";
import { PropsWithChildren } from "react";
import { useParams } from "next/navigation";

const TaskListPageTemplate = ({ children }: PropsWithChildren) => {
    const params = useParams();
    const { id } = params;

    return (
        <TaskContextProvider listId={Number(id)}>
            {children}
        </TaskContextProvider>
    )
}
export default TaskListPageTemplate;