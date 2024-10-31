'use client'
import Button from "@/components/button/Button";
import { useEffect, useState } from "react";

const TasksLists: React.FC = () => {
  const [lists, setLists] = useState<Array<{ id: number, title: string }>>([]);

  useEffect(() => {
    const savedLists = localStorage.getItem('lists');

    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
    
  }, [])

  return (
    <div>
      <h1 className="font-bold text-4xl text-center">Voir toutes les listes</h1>
      <section className="flex h-[35rem] flex-col   ">
        <ol className="w-2/6 mx-auto items-center  ">
          {lists.map((list) => (
            <li key={list.id}>
              <div className="border-2 h-[5rem] flex items-center p-5 my-5">
                {list.title}
                <span className="w-full text-end flex justify-end">

                  <Button title="Voir plus" route="#" className="h-[2rem]  w-1/12 text-sm   bg-blue-100 hover:bg-blue-200" >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus text-black m-auto">
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </Button>
                  <Button
                    title="Supprimer"
                    route="#"
                    className="h-[2rem] w-1/12 text-sm bg-red-200 hover:bg-red-300">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x text-black m-auto ">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </span>
              </div>
            </li>
          ))}
        </ol>

      </section>
    </div>
  );
};

export default TasksLists;