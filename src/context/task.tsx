import Input from "@/components/input/input";
import { createContext, useState, useContext } from "react";

interface TaskContextType {
    task: TaskType[],
    addTask: (task: TaskType) => void,
    removeTask: (task: TaskType) => void
}
interface TaskType {
    id: number,
    content: string
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskContextProvider = ({ children }: PropsWithChildren) => {
    // const { addTaskToList } = useContext(ListContext)!;
    const [task, setTask] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    const addTask = () => {

        // const newTask
        return [...task, newTask]

    }

    const removeTask = () => {

    }

    return (
        <TaskContext.Provider value={{ addTask, removeTask }}>

            {children}
        </TaskContext.Provider>
    )
}