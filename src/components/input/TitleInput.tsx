'use client'

import { useState } from 'react';

const TitleInput = () => {
    const [titleTask, setTitleTask] = useState<string>('');
    const [displayOnClick, setDisplayOnClick] = useState<string>('');

    // useEffect(() => {
    //     const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    // })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setTitleTask(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setDisplayOnClick(titleTask);
    };

    return (<div>
        <br></br>
        <form onSubmit={handleSubmit}>

            <label htmlFor="Title">Titre de la liste </label>
            <br />
            <input className="text-black h-[3rem] w-2/3 md:w-1/6   bg-gray-100 rounded-sm focus:border-purple-500 focus:border-2      " placeholder="Ecrivez ici le titre de la liste" type="text" id="title-task" value={titleTask} onChange={handleChange} required />

            <button type="submit" className=" mx-5 px-5 bg-purple-700 font-semibold text-white font-xl rounded-md h-[3rem]">Ajouter un titre</button>
        </form>
        <div>
            <h2> {displayOnClick ? displayOnClick : ''}</h2>
        </div>
    </div>)
}

export default TitleInput;
