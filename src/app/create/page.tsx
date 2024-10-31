'use client'
import Navbar from "@/components/Navbar/page";
import { useEffect, useState } from "react";
const Create = () => {
    const [lists, setLists] = useState<Array<{ id: number, title: string }>>(() => {
        const savedLists = localStorage.getItem('lists');
        return savedLists ? JSON.parse(savedLists) : [];
      });
      const [newListTitle, setNewListTitle] = useState<string>('');
  
    useEffect(()=>{
        localStorage.setItem('lists', JSON.stringify(lists))}, [lists]);

    const handleAddList = (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
      const newList = { id: lists.length + 1, title: newListTitle };
      setLists([...lists, newList]);
      setNewListTitle('');
    };
  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewListTitle(e.target.value);
    };
  
    return (
      <div>
        <h1 className="font-bold text-4xl text-center">Créer une nouvelle liste</h1>
        <h2>{}</h2>
        <form className=" h-[35rem] flex flex-col justify-center items-center ">
        <input
          type="text"
          value={newListTitle}
          onChange={handleChange}
          placeholder="Nouvelle liste"
          className="border-2 border-black w-2/6 rounded-md px-5 h-[3rem] mb-5"
        />
        <button onClick={handleAddList} className="w-1/12 bg-slate-200 rounded-md border-slate-500 border-1 hover:bg-slate-300">Ajouter</button>
        </form>
        {/* <ul>
          {lists.map((list) => (
            <li key={list.id}>{list.title}</li>
          ))}
        </ul> */}
      </div>
    );
  };
export default Create
