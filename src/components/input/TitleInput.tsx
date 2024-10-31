'use client'

// import { title } from 'process';
import { useState, useEffect, useCallback } from 'react';
import Button from '../button/Button';

const TitleInput = () => {
    const [titleTask, setTitleTask] = useState<string>('');
    // const [displayOnClick, setDisplayOnClick] = useState<string>('');

    useEffect(() => {
        const saveTitle = localStorage.getItem('titre');
        if (saveTitle) {
            setTitleTask(saveTitle);
        }
    }, []);
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.target.value);
    }, []);
    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        // localStorage.setItem('titre', titleTask);
        console.log(titleTask);
        event.preventDefault();
        // setDisplayOnClick(titleTask);
    }, [titleTask]);
    console.log(titleTask);

    return (<div>
        <br></br>
        <form onSubmit={handleSubmit}>

            <label htmlFor="Title">Titre de la liste </label>
            <br />

            <input className="text-black h-[3rem] w-2/3 md:w-1/6   bg-gray-100 rounded-sm focus:border-purple-500 focus:border-2      " placeholder="Ecrivez ici le titre de la liste" type="text" id="title-task" value={titleTask} onChange={handleChange} required />

            {/* <Button  title="Ajoutez"/> */}
        </form>
        <div>
            {/* <h2> {displayOnClick ? displayOnClick : ''}</h2> */}
            <p>{titleTask ? titleTask : ''}</p>
        </div>
    </div>)
}

export default TitleInput;
