"use client"
import Button from "@/components/button/Button";
import Input from "@/components/input/input";
import { useContext, useState } from "react";
import { Check } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { TaskContext } from "@/context/task";
// interface OneTask extends {
//     ;
// }

const OneTaskList: React.FC = () => {
    const { list, addTaskToList, toggleTaskCompletion, removeTask, tasks } = useContext(TaskContext)!;
    const [newTask, setNewTask] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };



    const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNewTask("");

        addTaskToList({ content: newTask });

    }
    const handleTaskCompleted = (taskId: number, currentStatus: boolean) => {
        toggleTaskCompletion(taskId)
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
        removeTask(taskId)

    }

    return (
        <div>
            <h1
                className="font-bold text-5xl text-center text-black mt-20 mb-10"> {list?.title} </h1>
            <section
                className=" flex flex-col mt-20  items-center">

                <form
                    className=" w-full text-center "
                    onSubmit={handleAddTask}>
                    {/* border-2 border-black w-2/6 rounded-md px-5 h-[3rem] mb-5" */}
                    <Input
                        type="text "
                        name="input-new-task"
                        id="new-task"
                        value={newTask}
                        onChange={handleChange}
                        className="max-md:w-72 w-[27rem] border-black border-2 p-2.5 focus:outline-none shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-emerald-300 focus:bg-emerald-400 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-lg placeholder:text-black"
                        placeholder="Ecrire une tâche" />
                    <br />
                    <Button
                        className="h-[3rem]  shadow-[3px_3px_0px_rgba(0,0,0,1)]   border-black border-2 w-32 font-medium p-2.5 hover:outline-none bg-yellow-300 hover:bg-yellow-400 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-lg mt-5">Ajouter</Button>
                </form>
                {/* <h2>{list?.title}</h2> */}
                <ul
                    className="mt-20 w-96 md:w-[28rem]">
                    {tasks.map((task) => {
                        return (
                            <li
                                key={task.id}
                                className={task.completed ? 'line-through border-2 h-[5rem] md:w-[26.5rem] max-lg:w-5/6 w-full  mx-auto  hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] border-black rounded-lg  flex   justify-around p-5 my-5 bg-white break-all' : "border-2 h-[5rem] md:w-[26.5rem]  max-lg:w-5/6 w-full  mx-auto  hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] border-black rounded-lg  flex   justify-around p-5 my-5 bg-white break-all"}>
                                <span
                                    className="w-[75%]  flex items-center ">
                                    {task.content}
                                </span>
                                <span
                                    className="ml-5 w-[25%] flex items-center">
                                    <Button
                                        className=" border-2 border-black shadow-[1px_2px_0px_rgba(0,0,0,1)]  w-[1.7rem] h-[1.7rem] bg-cyan-400 hover:bg-cyan-500 ml-3"
                                        data-task-id={task.id}
                                        onClick={handleCompleted}>
                                        <Check
                                            height={15}
                                            className="text-black font-bold" />
                                    </Button>
                                    <Button
                                        className="  border-2 border-black  shadow-[1px_2px_0px_rgba(0,0,0,1)]  w-[1.7rem] h-[1.7rem] bg-red-400 hover:bg-red-500 ml-3 "
                                        data-task-delete={task.id}
                                        onClick={handleRemoveTask} >
                                        <Trash2
                                            height={15} />
                                    </Button>
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