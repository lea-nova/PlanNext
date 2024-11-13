// import Input from "@/components/input/input";
import { createContext, useContext, PropsWithChildren, useMemo, useCallback, useState, useEffect } from "react";
import ListContext, { ListType, Task } from "./list";


interface TaskContextType {
    list?: ListType,
    addTaskToList: (task: Omit<Task, 'id'>) => void,
    removeTask: (taskId: number) => void,
    toggleTaskCompletion: (taskId: number) => void,
    tasksToLocal: Task[]
}

interface TaskContextProviderProps {
    listId: number
}

interface TasksToLocalType {
    id?: number,
    listId: number,
    content: string,
    completed: boolean
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskContextProvider = ({ children, listId }: PropsWithChildren<TaskContextProviderProps>) => {
    const [tasksToLocal, setTasksToLocal] = useState<TasksToLocalType[]>([]);
    // Récupérer toutes les listes présentes dans le localStorage

    // Récupération des tâches du localStorage au montage initial 
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            console.log("Tâche récupérées du localSto : ", JSON.parse(savedTasks));
            setTasksToLocal(JSON.parse(savedTasks));
        }
    }, []);
    // Sauvegarde des tâches dans le localStorage lorsque l'état change
    useEffect(() => {
        if (tasksToLocal) {
            console.log("Tâches sauvegardées dans le localStorage : ", tasksToLocal);
            localStorage.setItem('tasks', JSON.stringify(tasksToLocal));
        }
    }, [tasksToLocal]);
    const { lists, setLists } = useContext(ListContext)!;

    const list = useMemo(() => lists.find((l) => l.id === listId), [lists, listId]);

    // const tasks = list ? list.tasks : [];
    // const [task, setTask] = useState<string[]>([]);
    // const [newTask, setNewTask] = useState<string>('');


    const addTaskToList = useCallback<TaskContextType["addTaskToList"]>((task) => {
        const updatedLists: ListType[] = lists.map(list => {
            if (list.id == listId) {
                const newId = list.tasks.reduce((curr, { id }) => {
                    return Math.max(curr, id)
                }, 0) + 1
                const newTask: Task = { id: newId, listId: list.id, ...task };
                setTasksToLocal([...tasksToLocal, newTask])
                return { ...list, tasks: [...list.tasks, newTask] };
            }
            return list;
        })

        setLists(updatedLists);
    }, [listId, lists, setLists, setTasksToLocal, tasksToLocal]);

    const removeTask = useCallback<TaskContextType["removeTask"]>((taskId) => {
        const updatedLists: ListType[] = lists.map(list => {
            if (list.id == listId) {
                const newTask: Task[] = list.tasks.filter((task) => task.id !== taskId)
                setTasksToLocal(newTask)
                return { ...list, tasks: newTask }
            }
            return list;
        })

        setLists(updatedLists)
    }, [listId, lists, setLists, tasksToLocal])

    const toggleTaskCompletion = useCallback<TaskContextType["toggleTaskCompletion"]>((taskId) => {
        const updatedLists = lists.map(list => {
            if (list.id == listId) {
                const updatedTasks = list.tasks.map(task => {

                    if (task.id === taskId) { return { ...task, completed: !task.completed }; } return task;
                }); return { ...list, tasks: updatedTasks };

            }

            return list; // Si la liste ne correspond pas, on la laisse inchangée
        })
        setLists(updatedLists);
    }, [listId, lists, setLists])
    return (
        <TaskContext.Provider value={{ list, addTaskToList, removeTask, toggleTaskCompletion, tasksToLocal }}>

            {children}
        </TaskContext.Provider>
    )
}