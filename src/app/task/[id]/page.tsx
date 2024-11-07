"use client"
import Button from "@/components/button/Button";
import Input from "@/components/input/input";
import ListContext from "@/context/list";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";

// interface OneTask extends {
//     ;
// }

const OneTaskList: React.FC = () => {
    const params = useParams();
    const { id } = params;
    const { lists, addTaskToList, taskCompleted } = useContext(ListContext)!;
    const theList = lists.find((l) => l.id.toString() === id);
    const [newTask, setNewTask] = useState<string>('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNewTask("");
        addTaskToList(id, newTask);

    }

    // const handleTaskCompleted = (taskId: number, currentStatus: boolean) => {
    //     taskCompleted(id, taskId, !currentStatus)
    //     if (currentStatus == true) {
    //         return currentStatus
    //     }
    //     console.log("click checkbox", taskId)
    // }
    const handleClick = () => {
        taskCompleted(id, taskId, true);
    }

}
return (
    <div>
        <h1>Liste n°{theList?.id} : {theList?.title} </h1>
        <section className=" flex flex-col  items-center h-[30rem]">

            <form className="" onSubmit={handleAddTask}>

                <Input
                    type="text "
                    name="input-new-task"
                    id="new-task"
                    value={newTask}
                    onChange={handleChange}
                    className="border-2 rounded-md"
                    placeholder="Ecrire une tâche" /> <Button className="w-[50px] h-[50px]">+</Button>
            </form>
            <ul className="mt-5">
                {theList?.tasks.map((task) => {
                    return (
                        <li key={task.id} className={task.completed ? 'line-through' : ""}>
                            {/* <Input
                                    type="checkbox"
                                    className="mr-5 border-2"
                                    checked={task.completed}
                                    onChange={() => handleTaskCompleted(task.id, task.completed)}
                                // // Appel du handler avec l'ID de la tâche 
                                /> */}
                            {task.content}
                            <Button onClick={handleClick}>Fini</Button>
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