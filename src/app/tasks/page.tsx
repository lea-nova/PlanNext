'use client'
import Button from "@/components/button/Button";
import { useContext, useMemo, useState } from "react";
import { Plus } from 'lucide-react';
import { X } from 'lucide-react';
import { list } from "postcss";
import ListContext from "@/context/list";
// import Link from "next/link";


const TasksLists: React.FC = ({ }) => {
  // Tableau pour stocker toutes les listes de tâches. 

  const { addList, lists, removeList } = useContext(ListContext)!;

  const memoLists = useMemo(() => lists, [lists]);
  console.log(lists);
  const [newListTitle, setNewListTitle] = useState<string>('');


  const handleAddList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addList({ title: newListTitle });
    setNewListTitle('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListTitle(e.target.value);
  };
  return (
    <div>
      <h1 className="font-bold text-4xl text-center">Créer une nouvelle liste</h1>
      <h2>{ }</h2>
      <form className=" h-[35rem] flex flex-col justify-center items-center " onSubmit={handleAddList}>
        <input
          type="text"
          value={newListTitle}
          onChange={handleChange}
          placeholder="Nouvelle liste"
          className="border-2 border-black w-2/6 rounded-md px-5 h-[3rem] mb-5"
        />
        <button type="submit" className="w-1/12 bg-slate-200 rounded-md border-slate-500 border-1 hover:bg-slate-300">Ajouter</button>
      </form>
      <h1 className="font-bold text-4xl text-center">Voir toutes les listes</h1>
      <section className="flex h-[35rem] flex-col   ">
        <ol className="w-2/6 mx-auto items-center  ">
          {memoLists.map((list) => (
            <li key={list.id}>
              <div className="border-2 h-[5rem] flex items-center p-5 my-5">
                <span className="w-full">{list.title}</span>
                <span className="w-full text-end flex justify-end">

                  <Button title="Voir plus" route={`../task/${list.id}`} className="h-[2rem]  w-[3rem] text-sm   bg-blue-100 hover:bg-blue-200" >
                    <Plus className="m-auto text-black" />
                  </Button>
                  <Button
                    onClick={() => removeList(list.id)}
                    title="Supprimer"
                    className=" w-[3rem]  text-sm bg-red-200 hover:bg-red-300">
                    <X className="m-auto text-black" />
                  </Button>
                </span>
              </div>
            </li>
          ))}
        </ol>

      </section>
    </div >
  );
};

export default TasksLists;