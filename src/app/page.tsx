'use client'
import Button from "@/components/button/Button";
import { useContext, useMemo, useState } from "react";
import { Plus } from 'lucide-react';
import { Trash2 } from 'lucide-react';
// import fetchLists from "./lists/page";
import ListContext from "@/context/list";
// import { ListType } from "@/types";

// import Link from "next/link";

// interface Task {
//   id: number,
//   listId: number,
//   content: string,
//   completed: boolean,
// }

const TasksLists: React.FC = ({ }) => {
  // Tableau pour stocker toutes les listes de tâches. 
  // const [listsFromDB, setListsFromDB] = useState<ListType[]>([]);
  const { addList, lists, removeList } = useContext(ListContext)!;



  const memoLists = useMemo(() => lists, [lists]);
  // setListsFromDB(memoLists)
  const [newListTitle, setNewListTitle] = useState<string>('');
  // const [tasks, setTasks] = useState<Task[]>([]);


  const handleAddList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addList({ title: newListTitle });
    setNewListTitle('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListTitle(e.target.value);
  };

  const handleListsTitle = () => {
    return memoLists?.length ? "Voir toutes les listes" : "";

  }




  return (
    <div className="">


      <h1
        className="  font-bold max-md:text-6xl text-8xl text-center mt-10 " >
        Plan Next
      </h1>
      <h2 className="text-center  max-md:text-xl text-3xl font-semibold   ">Un esprit clair, une liste à jour</h2>


      <form
        className=" w-5/6 md:mt-16  md:w-3/6 mx-auto h-[18rem] flex flex-col justify-center items-center "
        onSubmit={handleAddList}
      >
        <input
          type="text"
          value={newListTitle}
          onChange={handleChange}
          placeholder="Nouvelle liste"
          className="max-md:w-72 w-[27rem] border-black border-2 p-2.5 focus:outline-none shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-emerald-300 focus:bg-emerald-400 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-lg placeholder:text-black"
        />
        <button
          type="submit"
          className="shadow-[3px_3px_0px_rgba(0,0,0,1)]   border-black border-2 w-32 font-medium p-2.5 hover:outline-none bg-yellow-300 hover:bg-yellow-400 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-lg mt-5"
        >
          Ajouter
        </button>
      </form>

      <h2
        className="font-semibold text-4xl text-center mt-14 md:mt-48 text-black "
      >
        {handleListsTitle()}
      </h2>
      <section
        className="flex  flex-col "
      >
        <ol
          className=" w-[90%] md:w-[80%] lg:w-[60%] m-auto  grid max-md:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-3 md:gap-5  justify-center ">

          {memoLists.map((list) => (
            <li key={list.id} >
              <div
                className="border-2 h-[10rem]   w-full  mx-auto  hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] border-black rounded-lg  flex flex-col  justify-around p-5 my-5 bg-white">
                <span
                  className="w-full  text-center font-semibold  " >


                  {list.title}
                </span>
                <span
                  className="w-full text-end flex  justify-center">

                  <Button
                    title="Voir plus"
                    route={`../task/${list.id}`}
                    className="w-[1.7rem] h-[1.7rem] shadow-[1px_2px_0px_rgba(0,0,0,1)]  text-sm border-2 border-black bg-cyan-400 hover:bg-cyan-500 mr-5" >
                    <Plus
                      className="m-auto text-black" height={15} />
                  </Button>
                  <Button
                    onClick={() => removeList(list.id)}
                    title="Supprimer"
                    className="shadow-[1px_2px_0px_rgba(0,0,0,1)]  w-[1.7rem] h-[1.7rem] bg-red-400 rounded-md text-sm border-2 border-black hover:bg-red-500 ">
                    <Trash2
                      className="m-auto text-black " height={15} />
                  </Button>
                </span>
              </div>
            </li>
          ))}
        </ol>

      </section >
    </div >
  );
};

export default TasksLists;