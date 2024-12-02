import { TaskList } from "@/class/TaskList";
import { ListType } from "@/types";
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";

interface ListContextType {
    lists: ListType[]
    setLists(lists: ListContextType["lists"]): void,
    // signature de fonction
    addList(list: Omit<ListType, "id">): void
    removeList(listId: ListType['id']): void


}

// state global 
export const ListContext = createContext<ListContextType | undefined>(undefined)

// renvoi contexte
export const ListContextProvider = ({ children }: PropsWithChildren) => {
    // récupérer depuis l'interface 
    const [lists, setLists] = useState<ListContextType["lists"]>([]);
    const [listLoaded, setListLoaded] = useState<boolean>(false);
    // const [tasks, setTasks] = useState<Task[]>([]);

    const listFromDb = async () => {
        const listsInDb = await TaskList.getLists();
        // console.log(listsInDb);

        setLists(listsInDb);
    }
    useEffect(() => {
        listFromDb();
        setListLoaded(true);
    }, [])

    console.log(lists)
    useEffect(() => {
        if (!listLoaded) {
            return
        }

        TaskList.getLists();
    }, [lists, listLoaded]);

    const addList = useCallback<ListContextType["addList"]>(async (newList) => {
        setLists(await TaskList.addList(newList))
    }, []);

    const removeList = useCallback<ListContextType["removeList"]>(async (listId) => {
        setLists(await TaskList.removeList(listId));
    }, []);

    return (

        <ListContext.Provider value={{ lists, setLists, addList, removeList }}>

            {children}
        </ListContext.Provider>
    )
}
export default ListContext;