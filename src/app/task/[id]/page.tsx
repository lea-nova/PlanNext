"use client"
import Button from "@/components/button/Button";
import Input from "@/components/input/input";
import { useContext, useState } from "react";
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { TaskContext } from "@/context/task";
// interface OneTask extends {
//     ;
// }

const OneTaskList: React.FC = () => {
    const { list, addTaskToList, toggleTaskCompletion, removeTask, tasksToLocal } = useContext(TaskContext)!;
    const [newTask, setNewTask] = useState<string>('');

    // console.log(tasksToLocal);
    // tasksToLocal.forEach(element => {
    //     console.log(element);

    // });
    const taskToTheList = tasksToLocal.find((t) => t.listId === list?.id)
    console.log(taskToTheList);
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
                className="font-bold text-4xl text-center mb-8">Liste n°{list?.id} : {list?.title} </h1>
            <section
                className=" flex flex-col  items-center">

                <form
                    className=""
                    onSubmit={handleAddTask}>

                    <Input
                        type="text "
                        name="input-new-task"
                        id="new-task"
                        value={newTask}
                        onChange={handleChange}
                        className="border-2 rounded-md"
                        placeholder="Ecrire une tâche" />
                    <Button
                        className="h-[1.7rem] w-[1.7rem] bg-zinc-500 hover:bg-zinc-600">+</Button>
                </form>
                <ul
                    className="mt-5">
                    {list?.tasks.map((task) => {
                        return (
                            <li
                                key={task.id}
                                className={task.completed ? 'line-through' : ""}>
                                {task.content}
                                <span className="ml-5">
                                    <Button
                                        className="w-6 h-[1.7rem] bg-emerald-500 hover:bg-emerald-600 ml-3"
                                        data-task-id={task.id}
                                        onClick={handleCompleted}>
                                        <Check
                                            height={15}
                                            className="text-black font-bold" />
                                    </Button>
                                    <Button
                                        className=" w-auto  h-[1.7rem] bg-red-600 hover:bg-red-700 ml-3 "
                                        data-task-delete={task.id}
                                        onClick={handleRemoveTask} >
                                        <X
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