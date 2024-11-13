import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";


export interface Task {
    id: number,
    listId?: number,
    content: string,
    completed?: boolean,
}

interface ListContextType {
    lists: ListType[]
    setLists(lists: ListContextType["lists"]): void,
    // signature de fonction
    addList(list: Omit<ListType, "id">): void
    removeList(listId: ListType['id']): void


}

export interface ListType {
    id: number,
    title: string,
    // Ici je peux enlever le tasks ou alors je mets un tableau d'id. Mais si je mets déjà les listId das les tâches pas besoin ici d'une collection de Task. 
    tasks: Task[]
}

// state global 
export const ListContext = createContext<ListContextType | undefined>(undefined)

// renvoi contexte
export const ListContextProvider = ({ children }: PropsWithChildren) => {
    // récupérer depuis l'interface 
    const [lists, setLists] = useState<ListContextType["lists"]>([]);
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

    const addList = useCallback<ListContextType["addList"]>((newList) => {
        setLists((lists) => {
            const newId = lists.reduce((curr, { id }) => {
                return Math.max(curr, id)
            }, 0) + 1
            return [...lists, { id: newId, ...newList }];
        })
    }, []);

    const removeList = useCallback<ListContextType["removeList"]>((listId) => {
        setLists((lists) => lists.filter(({ id }) => id !== listId));
    }, []);

    return (

        <ListContext.Provider value={{ lists, setLists, addList, removeList }}>
            {children}
        </ListContext.Provider>
    )
}
export default ListContext;
