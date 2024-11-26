// import Input from "@/components/input/input";
import { createContext, useContext, PropsWithChildren, useMemo, useCallback, useState, useEffect } from "react";
import ListContext from "./list";
import { ListType, Task } from "@/types";
import { TaskList } from "@/class/TaskList";


interface TaskContextType {
    list?: ListType,
    addTaskToList: (task: Omit<Task, 'id' | 'listId'>) => void,
    removeTask: (taskId: number) => void,
    toggleTaskCompletion: (taskId: number) => void,
    tasks: Task[]
}

interface TaskContextProviderProps {
    listId: number
}

// interface TasksToLocalType {
//     id?: number,
//     listId?: number,
//     content: string,
//     completed: boolean
// }

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskContextProvider = ({ children, listId }: PropsWithChildren<TaskContextProviderProps>) => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const tasks = useMemo(() => allTasks.filter((task) => task.listId === listId), [allTasks, listId])

    // Récupération des tâches du localStorage au montage initial 
    useEffect(() => {
        setAllTasks(TaskList.getTasks());
        setIsLoaded(true);
    }, []);

    // Sauvegarde des tâches dans le localStorage lorsque l'état change
    useEffect(() => {
        if (isLoaded) {
            console.log("à save dans le  localStorage : ", allTasks);
            TaskList.setTasks(allTasks);
            // localStorage.setItem('tasks', JSON.stringify(allTasks));
        }
    }, [isLoaded, allTasks]);
    const { lists } = useContext(ListContext)!;

    const list = useMemo(() => lists.find((l) => l.id === listId), [lists, listId]);



    const addTaskToList = useCallback<TaskContextType["addTaskToList"]>((task) => {
        setAllTasks(TaskList.addTask({ ...task, listId }))

    }, [listId]);

    const removeTask = useCallback<TaskContextType["removeTask"]>((taskId) => {
        setAllTasks(TaskList.removeTask(taskId));
    }, [])

    const toggleTaskCompletion = useCallback<TaskContextType["toggleTaskCompletion"]>((taskId) => {
        setAllTasks(TaskList.toggleTaskCompletion(taskId));

    }, [])

    return (
        <TaskContext.Provider value={{ list, addTaskToList, removeTask, toggleTaskCompletion, tasks }}>

            {children}
        </TaskContext.Provider>
    )
}
export default TaskContext;
