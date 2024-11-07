import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";

interface Task {
    id: number,
    content: string,
    completed: boolean
}

interface listContextType {
    lists: listType[]
    // signature de fonction
    addList(list: Omit<listType, "id">): void
    removeList(listId: listType['id']): void
    addTaskToList(listId: number, newTask: string): void,
    taskCompleted(listId: number, taskId: number, changeBool: boolean): void

}

interface listType {
    id: number,
    title: string,
    tasks: Task[]
}

// state global 
export const ListContext = createContext<listContextType | undefined>(undefined)

// renvoi contexte
export const ListContextProvider = ({ children }: PropsWithChildren) => {
    // récupérer depuis l'interface 
    const [lists, setLists] = useState<listContextType["lists"]>([]);
    const [listLoaded, setListLoaded] = useState<boolean>(false);
    // const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        // Récupérer toutes les listes présentes dans le localStorage
        const savedLists = localStorage.getItem('lists');
        if (savedLists) {
            // Enregistré dans list.
            setLists(JSON.parse(savedLists));
        }
        setListLoaded(true);
    }, [])

    console.log(lists)
    useEffect(() => {
        if (!listLoaded) {
            return
        }

        localStorage.setItem('lists', JSON.stringify(lists))
    }, [lists, listLoaded]);

    const addList = useCallback<listContextType["addList"]>((newList) => {
        setLists((lists) => {
            const newId = lists.reduce((curr, { id }) => {
                return Math.max(curr, id)
            }, 0) + 1
            return [...lists, { id: newId, ...newList }];
        })
    }, []);

    const removeList = useCallback<listContextType["removeList"]>((listId) => {
        setLists((lists) => lists.filter(({ id }) => id !== listId));
    }, []);


    const addTaskToList = (listId: number, content: string) => {
        const updatedLists = lists.map(list => {
            if (list.id == listId) {
                const newId = list.tasks.reduce((curr, { id }) => {
                    return Math.max(curr, id)
                }, 0) + 1
                const newTask: Task = { id: newId, content: content, completed: false };
                return { ...list, tasks: [...(list.tasks) || [], newTask] };
            }
            return list;
        })

        setLists(updatedLists);
    };

    const taskCompleted = (listId: number, taskId: number, changeBool: boolean) => {
        const updatedLists = lists.map(list => {
            if (list.id == listId) {
                const updatedTasks = list.tasks.map(task => {

                    if (task.id === taskId) { return { ...task, completed: !task.completed }; } return task;
                }); return { ...list, tasks: updatedTasks };

            }

            return list; // Si la liste ne correspond pas, on la laisse inchangée
        })
        setLists(updatedLists);
    }




    return (

        <ListContext.Provider value={{ lists, addList, removeList, addTaskToList, taskCompleted }}>
            {children}
        </ListContext.Provider>
    )
}
export default ListContext;
