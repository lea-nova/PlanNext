import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
interface listContextType {
    lists: listType[]
    // signature de fonction
    addList(list: Omit<listType, "id">): void
    removeList(listId: listType['id']): void
}

interface listType {
    id: number,
    title: string
}
// state global 
export const ListContext = createContext<listContextType | undefined>(undefined)

// renvoi contexte
export const ListContextProvider = ({ children }: PropsWithChildren) => {
    // récupérer depuis l'interface 
    const [lists, setLists] = useState<listContextType["lists"]>([]);
    const [listLoaded, setListLoaded] = useState<boolean>(false);
    useEffect(() => {
        // Récupérer toutes les listes présentes dans le localStorage
        const savedLists = localStorage.getItem('lists');
        if (savedLists) {
            // Enregistré dans list.
            setLists(JSON.parse(savedLists));
        }
        setListLoaded(true);
    }, [])

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


    return (

        <ListContext.Provider value={{ lists, addList, removeList }}>
            {children}
        </ListContext.Provider>
    )
}
export default ListContext;
