"use client"
import Button from "@/components/button/Button";
import Input from "@/components/input/input";
import ListContext from "@/context/list";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
// interface OneTask extends {
//     ;
// }

const OneTaskList: React.FC = () => {
    const params = useParams();
    const { id } = params;
    const { lists, addTaskToList, taskCompleted, removeTask } = useContext(ListContext)!;
    const theList = lists.find((l) => l.id.toString() === id);
    const [newTask, setNewTask] = useState<string>('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNewTask("");
        addTaskToList(Number(id), newTask);

    }
    const handleTaskCompleted = (taskId: number, currentStatus: boolean) => {
        taskCompleted(Number(id), taskId, !currentStatus)
        if (currentStatus == true) {
            return currentStatus
        }
    }

    const handleCompleted = (event: React.MouseEvent<HTMLButtonElement>) => {
        const taskId = Number(event.currentTarget.getAttribute('data-task-id'))
        handleTaskCompleted(taskId, true);
    }

    const handleRemoveTask = (event: React.MouseEvent<HTMLButtonElement>) => {
        const taskId = Number(event.currentTarget.getAttribute('data-task-delete'))
        removeTask(Number(id), taskId)
    }
    return (
        <div>
            <h1 className="font-bold text-4xl text-center mb-8">Liste n°{theList?.id} : {theList?.title} </h1>
            <section className=" flex flex-col  items-center h-[30rem]">

                <form className="" onSubmit={handleAddTask}>

                    <Input
                        type="text "
                        name="input-new-task"
                        id="new-task"
                        value={newTask}
                        onChange={handleChange}
                        className="border-2 rounded-md"
                        placeholder="Ecrire une tâche" />
                    <Button className="h-7 w-7 bg-zinc-500 hover:bg-zinc-600">+</Button>
                </form>
                <ul className="mt-5">
                    {theList?.tasks.map((task) => {
                        return (
                            <li key={task.id} className={task.completed ? 'line-through' : ""}>
                                {task.content}
                                <span className="ml-5">
                                    <Button className="w-auto  h-6 bg-emerald-500 hover:bg-emerald-600" data-task-id={task.id} onClick={handleCompleted}><Check height={15} className="text-black font-bold" /></Button>
                                    <Button className=" w-auto  h-6 bg-red-600 hover:bg-red-700 " data-task-delete={task.id} onClick={handleRemoveTask}><X height={15} /></Button>
                                </span>
                            </li>


                        )
                    })
                    }
                </ul>
            </section>
        </div >
    )
}
export default OneTaskList;