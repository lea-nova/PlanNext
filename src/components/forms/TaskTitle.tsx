import { title } from 'process';
import { useState, useEffect } from 'react';

const TaskTitle = () => {
    const [titleTask, setTitleTask] = useState<string>('');
    const [displayTask, setDisplayTask] = useState<string>('');
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    })
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setDisplayTask(titleTask);
    }

    return (<div>
        <br></br>
        <form onSubmit={handleSubmit}>

            <label htmlFor="Title">Titre de la liste </label>
            <br />
            <input className="text-black h-[3rem] w-3/4   bg-gray-100 rounded-sm focus:border-purple-500 focus:border-2      " placeholder="Ecrivez ici le titre de la liste" type="text" id="title-task" value={titleTask} onChange={(e) => setTitleTask(e.target.value)} required />

            <button type="submit" className=" mx-5 px-5 bg-purple-700 font-semibold text-white font-xl rounded-md h-[3rem]">Ajouter un titre</button>
        </form>
        <div>
            <h2>Task Title: {displayTask}</h2>
        </div>
    </div>)
}

export default TaskTitle;
