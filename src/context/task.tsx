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
    tasks: Task[],
    allTasks: Task[],
    // addTask: (task: Omit<Task, 'id'>) => void,
    loadTasks: () => Promise<void>;
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
    // const [isLoaded, setIsLoaded] = useState<boolean>();

    const tasks = useMemo(() => allTasks.filter((task) => task.listId === listId), [allTasks, listId])




    const loadTasks = async () => {
        try {
            const fetchedTasks = await TaskList.getTasks();
            setAllTasks(fetchedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    // Récupération des tâches du localStorage au montage initial 
    useEffect(() => {
        loadTasks()
        // setAllTasks(tasks);
        // setIsLoaded(true);
    }, []);


    // // Sauvegarde des tâches dans le localStorage lorsque l'état change
    // useEffect(() => {
    //     if (isLoaded) {
    //         // console.log("à save dans le  localStorage : ", allTasks);
    //         TaskList.getTasks();

    //     }
    // }, [isLoaded, allTasks]);

    const { lists } = useContext(ListContext)!;

    const list = useMemo(() => lists.find((l) => l.id === listId), [lists, listId]);

    const addTaskToList = useCallback<TaskContextType["addTaskToList"]>(async (task) => {
        await TaskList.addTask({ ...task, listId })
        const taskFromDB = await TaskList.getTasksByListId(listId);
        setAllTasks(taskFromDB);
        return
    }, [listId]);

    const removeTask = useCallback<TaskContextType["removeTask"]>(async (taskId) => {
        setAllTasks(await TaskList.removeTask(taskId));
    }, [])

    const toggleTaskCompletion = useCallback<TaskContextType["toggleTaskCompletion"]>(async (taskId) => {
        const updatedTask = await TaskList.toggleTaskCompletion(taskId);

        if (!updatedTask) {
            console.error('Impossible de toggler la tâche');
            return;
        }

        setAllTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task // Remplacer la tâche modifiée dans la liste
            )
        );
        return updatedTask
    }, []);

    return (
        <TaskContext.Provider value={{ list, addTaskToList, removeTask, toggleTaskCompletion, tasks, allTasks, loadTasks }}>
            {children}
        </TaskContext.Provider>
    )
}
export default TaskContext;
