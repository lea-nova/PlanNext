// 'use client'

// import ListContext from "@/context/list";
// import { useContext, useState } from "react";

// interface Task {
//   id: number,
//   content: string
// }


// const Create = () => {
//   const { addList } = useContext(ListContext)!

//   const [newListTitle, setNewListTitle] = useState<string>('');
//   // const [tasks, setTasks] = useState<Task[]>([]);
//   // const [newTask, setNewTask] = useState<string[]>([]);


//   const handleAddList = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     addList({ title: newListTitle, tasks: tasks });
//     setNewListTitle('');
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewListTitle(e.target.value);
//   };

//   return (
//     <div>
//       <h1 className="font-bold text-4xl text-center">Créer une nouvelle liste</h1>
//       <h2>{ }</h2>
//       <form className=" h-[35rem] flex flex-col justify-center items-center " onSubmit={handleAddList}>
//         <input
//           type="text"
//           value={newListTitle}
//           onChange={handleChange}
//           placeholder="Nouvelle liste"
//           className="border-2 border-black w-2/6 rounded-md px-5 h-[3rem] mb-5"
//         />
//         <button type="submit" className="w-1/12 bg-slate-200 rounded-md border-slate-500 border-1 hover:bg-slate-300">Ajouter</button>
//       </form>
//       {/* <ul>
//           {lists.map((list) => (
//             <li key={list.id}>{list.title}</li>
//           ))}
//         </ul> */}
//     </div>
//   );
// };
// export default Create
